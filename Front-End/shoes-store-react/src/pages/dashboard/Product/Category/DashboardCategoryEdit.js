import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import axios from "axios";
import * as Yup from "yup";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Layout from "../../Layout";
import {useParams} from "react-router-dom";

const uploadImageToFirebase = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
};

function DashboardProductAdd() {
    const {categoryId} = useParams();
    const [category, setCategory] = useState({
        name: '',
        avatar: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    useEffect(() => {
        const fetchCategoryData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/category/${categoryId}`,{ withCredentials: true });
                console.log(response.data)
                setCategory(response.data)
                setPreviewUrl(response.data.avatar);
            } catch (error) {
                console.log(error);
                toast.error("Lỗi khi lấy dữ liệu danh mục");
            }
        };
        fetchCategoryData();
    }, [categoryId]);

    const categoriesSchema = Yup.object().shape({
        name: Yup.string()
            .required('Tên danh mục là bắt buộc')
            .min(2, 'Tên danh mục quá ngắn')
            .max(50, 'Tên danh mục quá dài')
    });

    const handleSubmitFormAdd = async (values) => {
        try {
            const imageUrl = await uploadImageToFirebase(selectedFile);
            values.avatar = imageUrl;
            try {
                await axios.post("http://localhost:8080/api/category/add", values, {withCredentials: true})
                toast.success("Thêm mới thành công")
            } catch (e) {
                console.log(e);
            }
        } catch (e) {
            console.log(e)
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


    return (
        <Layout>
            <div className="container-fluid p-5">
                <h4>Chỉnh sửa danh mục</h4>
                <p className="sub-title">
                    Trang chỉnh sửa danh mục sản phẩm vào hệ thống
                </p>
                <hr width={'100%'}/>
                <Formik initialValues={{...category}} enableReinitialize onSubmit={(values) => handleSubmitFormAdd(values)} validationSchema={categoriesSchema}>
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Tên danh mục</label>
                            <Field name="name" type="text" id="name" className="form-control"
                                   aria-describedby="name"/>
                            <ErrorMessage component="div" name="name" id="name"
                                          className="form-text text-danger"/>
                        </div>
                        <div className="mb-3 row">
                            <div className={previewUrl === '' ? '' : 'col-lg-9'}>
                                <label htmlFor="avatar" className="form-label">Ảnh đại diện</label>
                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    className="form-control"
                                    accept="image/png, image/jpeg, image/jpg"
                                    aria-describedby="avatar"
                                    onChange={handleFileChange}
                                />
                            </div>
                            {previewUrl === '' ? '' : (
                                <div className="col-lg-auto">
                                    <img src={previewUrl} alt="Xem trước hình ảnh" width={'200px'}/>
                                </div>
                            )}
                            <ErrorMessage component="div" name="avatar" id="avatar"
                                          className="form-text text-danger"/>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" type="submit">Thêm danh mục</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </Layout>
    );
}

export default DashboardProductAdd;