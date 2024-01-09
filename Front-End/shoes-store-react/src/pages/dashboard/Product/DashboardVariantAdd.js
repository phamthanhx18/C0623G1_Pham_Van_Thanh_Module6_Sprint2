import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Layout from "../Layout";
import axios from "axios";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import * as Yup from "yup";

const uploadImageToFirebase = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
};

function DashboardVariantAdd() {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [uploadingImages, setUploadingImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getProductById = async () => {
        let res = await axios.get(`http://localhost:8080/api/product/${id}`)
        setProduct(res.data);
    }
    const getAllColor = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/color");
            setColors(res.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu danh mục:', error);
        }
    };
    const getAllSize = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/size");
            setSizes(res.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu danh mục:', error);
        }
    };
    const initValues = {
        avatar: "",
        color: {},
        stock: "",
        price: "",
        size: [],
        priceSale: "",
        albumsVariant: []
    }
    useEffect(() => {
        getProductById();
        getAllColor();
        getAllSize();
    }, []);
    const formSchema = Yup.object().shape({
        stock: Yup.number().required('Số lượng tồn kho là bắt buộc').positive('Số lượng tồn kho phải lớn hơn 0'),
        price: Yup.number().required('Giá là bắt buộc').positive('Giá phải lớn hơn 0'),
        priceSale: Yup.number().positive('Giá khuyến mãi phải lớn hơn 0'),
        size: Yup.array().min(1, 'Ít nhất phải chọn một kích cỡ'),
        // Thêm các quy tắc khác tùy vào trường dữ liệu của bạn
    });
    const handleSubmitForm = async (values) => {
        setIsLoading(true);
        try {
            if (selectedFile) {
                const avatarUrl = await uploadImageToFirebase(selectedFile);
                values.avatar = avatarUrl;
            }

            const albumsVariantUrls = await Promise.all(
                uploadingImages.map(file => uploadImageToFirebase(file))
            );

            values.albumsVariant = albumsVariantUrls;
            if (typeof values.color === 'string') {
                values.color = JSON.parse(values.color);
            }
            values.size = values.size.map(item => {
                return typeof item === 'string' ? JSON.parse(item) : item;
            });
            const response = await axios.post(`http://localhost:8080/api/product/${id}/add-variant`, values, { withCredentials: true });
            if (response.status === 200) {
                toast.success("Thêm mới thành công");
                setSelectedFile(null);
                setPreviewUrl("");
                setUploadingImages([]);
            } else {
                toast.error("Đã xảy ra lỗi khi thêm sản phẩm");
            }
        } catch (e) {
            console.log(e);
            toast.error("Lỗi khi gửi dữ liệu: " + e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMultipleFileChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            const newUploadingImages = files.map(file => {
                if (file.size > 5242880) { // Kiểm tra kích thước file
                    toast.error("File quá lớn. Vui lòng chọn file có kích thước nhỏ hơn 5MB.");
                    return null;
                }
                return file;
            }).filter(file => file !== null);

            setUploadingImages(currentImages => [...currentImages, ...newUploadingImages]);
        }
    };


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
    const handleRemoveImage = (indexToRemove) => {
        setUploadingImages(currentImages =>
            currentImages.filter((_, index) => index !== indexToRemove)
        );
    };

    return (
        <Layout>
            <div className="container-fluid p-5">
                <h4>Thêm biến thể cho sản phẩm {product.productName}</h4>
                <hr width={'100%'}/>
                <Formik initialValues={initValues} onSubmit={(values) => handleSubmitForm(values)}
                        validationSchema={formSchema}>
                        <Form>
                        <div className="mb-3 row">
                            <div className={previewUrl === '' ? '' : 'col-lg-9'}>
                                <label htmlFor="avatar" className="form-label">Ảnh đại diện</label>
                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
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
                            <ErrorMessage component="div" name="avatar" id="avatar"
                                          className="form-text text-danger"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="color" className="form-label">Chọn màu sắc</label>
                            <Field as="select" name="color" className="form-select"
                                   aria-label="Default select example">
                                <option value="">Vui lòng chọn</option>
                                {colors.map((item) =>
                                    <option key={item.id} value={JSON.stringify(item)}>{item.colorName}</option>
                                )}
                            </Field>
                            <ErrorMessage component="div" name="color" id="color"
                                          className="form-text text-danger"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="size" className="form-label">Chọn size</label><br/>
                            {sizes.map(item => (
                                <div className="form-check form-check-inline">
                                    <Field key={item.id} name="size" className="form-check-input" type="checkbox"
                                           id={item.sizeName}
                                           value={JSON.stringify(item)}/>
                                    <label className="form-check-label" htmlFor={item.sizeName}>{item.sizeName}</label>
                                </div>
                            ))}
                            <ErrorMessage component="div" name="size" id="size"
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
                            <label htmlFor="stock" className="form-label">Số lượng tồn kho</label>
                            <Field name="stock" type="number" id="productName" className="form-control"
                                   aria-describedby="productName"/>
                            <ErrorMessage component="div" name="stock" id="stock"
                                          className="form-text text-danger"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFileMultiple" className="form-label">Albums ảnh biến thể</label>
                            <input
                                name="albumsVariant"
                                type="file"
                                multiple
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleMultipleFileChange}
                                className="form-control"
                            />
                        </div>
                        {uploadingImages.length > 0 ? (
                            <>
                                <p>Xem trước hình ảnh: </p>
                                <div className="row">
                                    {uploadingImages.map((file, index) => (
                                        <div key={index} className="image-preview col-auto"
                                             style={{position: "relative"}}>
                                            <img src={URL.createObjectURL(file)} alt={`Image ${index}`}
                                                 style={{width: '100px', height: '100px'}}/>
                                            <button
                                                style={{
                                                    position: 'absolute',
                                                    top: '0',
                                                    right: '10px',
                                                    background: '#eeeeee96',
                                                    borderRadius: '5px',
                                                    border: '0'
                                                }}
                                                onClick={() => handleRemoveImage(index)}><i
                                                className="fa-solid fa-xmark"></i></button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : ''}
                        <div className="text-center my-5">
                            {isLoading ? <div>Loading...</div> : <button type="submit" className="btn btn-primary">Thêm biến thể</button>}
                        </div>
                    </Form>
                </Formik>
            </div>
        </Layout>
    );
}

export default DashboardVariantAdd;