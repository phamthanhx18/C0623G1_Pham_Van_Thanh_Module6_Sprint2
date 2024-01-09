import React, {useEffect, useState} from 'react';
import Layout from "../Layout";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import * as Yup from "yup";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadImageToFirebase = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
};

const editorConfiguration = {
    toolbar: {
        items: [
            'heading', '|', '|',
            'bold', 'italic', 'link', '|',
            'bulletedList', 'numberedList', '|',
            'imageUpload', 'mediaEmbed', '|',
            '|',
            'undo', 'redo'
        ],
        shouldNotGroupWhenFull: true
    },
    image: {
        toolbar: [
            'imageTextAlternative', '|',
            'imageStyle:full', 'imageStyle:side'
        ]
    },
    height: 300
};

function DashboardProductAdd() {
    const initValues = {
        productName: "",
        productAvatar: null,
        shortDescription: "",
        description: "",
        price: "",
        priceSale: "",
        category: null
    }
    const [selectedFile, setSelectedFile] = useState(null);
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");
    const [previewUrl, setPreviewUrl] = useState('');
    const [categories, setCategories] = useState([]);
    const productSchema = Yup.object().shape({
        productName: Yup.string()
            .required('Tên sản phẩm là bắt buộc')
            .min(2, 'Tên sản phẩm quá ngắn')
            .max(50, 'Tên sản phẩm quá dài'),
        price: Yup.number()
            .required('Giá sản phẩm là bắt buộc')
            .min(0, 'Giá sản phẩm không thể âm'),
        priceSale: Yup.number()
            .min(0, 'Giá khuyến mãi không thể âm')
            .nullable(),
        category: Yup.mixed()
            .required('Danh mục là bắt buộc')
    });
    const getAllCategories = async () => {
        let res = await axios.get("http://localhost:8080/api/category");
        setCategories(res.data);
    }
    useEffect(() => {
        getAllCategories();
    }, []);


    const handleSubmitFormAdd = async (values) => {
        values.shortDescription = shortDescription;
        values.description = description;
        values.category = JSON.parse(values.category)
        try {
            const imageUrl = await uploadImageToFirebase(selectedFile);
            values.productAvatar = imageUrl;
        } catch (e) {
            console.log(e)
        } finally {
            try {
                await axios.post("http://localhost:8080/api/product/add",values,{ withCredentials: true })
                toast.success("Thêm mới thành công")
            } catch (e) {
                console.log(e);
            }
        }

    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5242880) { // 5MB = 5 * 1024 * 1024 bytes
                toast.error("File quá lớn. Vui lòng chọn file có kích thước nhỏ hơn 5MB.");
                return;
            }
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleShortDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setShortDescription(data);
    };
    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setDescription(data);
    };

    return (
        <Layout>
            <div className="container-fluid p-5">
                <h4>Thêm mới sản phẩm</h4>
                <p className="sub-title">
                    Trang thêm mới sản phẩm vào hệ thống
                </p>
                <hr width={'100%'}/>
                <Formik initialValues={initValues} onSubmit={(values) => handleSubmitFormAdd(values)} validationSchema={productSchema}>
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Tên sản phẩm</label>
                            <Field name="productName" type="text" id="productName" className="form-control"
                                   aria-describedby="productName"/>
                            <ErrorMessage component="div" name="productName" id="productName"
                                          className="form-text text-danger"/>
                        </div>
                        <div className="mb-3 row">
                            <div className={previewUrl === '' ? '' : 'col-lg-9'}>
                                <label htmlFor="productAvatar" className="form-label">Ảnh đại diện</label>
                                <input
                                    type="file"
                                    id="productAvatar"
                                    name="productAvatar"
                                    className="form-control"
                                    accept="image/png, image/jpeg, image/jpg"
                                    aria-describedby="productAvatar"
                                    onChange={handleFileChange}
                                />
                            </div>
                            {previewUrl === '' ? '' : (
                                <div className="col-lg-auto">
                                    <img src={previewUrl} alt="Xem trước hình ảnh" width={'200px'}/>
                                </div>
                            )}
                            <ErrorMessage component="div" name="productAvatar" id="productAvatar"
                                          className="form-text text-danger"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="shortDescription" className="form-label">Mô tả ngắn</label>
                            <CKEditor
                                id="shortDescription"
                                editor={ClassicEditor}
                                config={editorConfiguration}
                                onChange={handleShortDescriptionChange}
                                data={shortDescription}
                            />
                            <ErrorMessage component="div" name="shortDescription" id="shortDescription"
                                          className="form-text text-danger"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Mô tả chi tiết</label>
                            <CKEditor
                                id="description"
                                editor={ClassicEditor}
                                config={editorConfiguration}
                                onChange={handleDescriptionChange}
                                data={description}
                            />
                            <ErrorMessage component="div" name="description" id="description"
                                          className="form-text text-danger"/>
                        </div>
                        <div className="mb-3 row">
                            <div className="col-lg-6">
                                <label htmlFor="price" className="form-label">Giá sản phẩm</label>
                                <Field name="price" type="text" id="price" className="form-control"
                                       aria-describedby="price"/>
                                <ErrorMessage component="div" name="price" id="price"
                                              className="form-text text-danger"/>
                            </div>
                            <div className="col-lg-6">
                                <label htmlFor="priceSale" className="form-label">Giá khuyến mãi sản phẩm(nếu
                                    có)</label>
                                <Field name="priceSale" type="text" id="priceSale" className="form-control"
                                       aria-describedby="priceSale"/>
                                <ErrorMessage component="div" name="priceSale" id="priceSale"
                                              className="form-text text-danger"/>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Danh mục</label>
                            <Field as="select" name="category" className="form-select"
                                   aria-label="Default select example">
                                <option selected>Chọn danh mục</option>
                                {categories.map((item) =>
                                    <option key={item.id} value={JSON.stringify(item)}>{item.name}</option>
                                )}
                            </Field>
                            <ErrorMessage component="div" name="category" id="category"
                                          className="form-text text-danger"/>
                        </div>

                        <div className="text-center">
                            <button className="btn btn-primary" type="submit">Thêm sản phẩm</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </Layout>
    );
}

export default DashboardProductAdd;