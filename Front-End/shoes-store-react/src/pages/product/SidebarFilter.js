import React, {useEffect, useState} from 'react';
import axios from "axios";

function SidebarFilter({ onFilterChange }) {
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [priceRange, setPriceRange] = useState({
        minPrice: 0,
        maxPrice: 699000 // Giả sử 1000 là giá cao nhất
    });

    const [filter, setFilter] = useState({
        categories: "",
        color: [],
        size: [],
        priceFilterMin: 0,
        priceFilterMax: 699000
    });

    const getAllCategories = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/category");
            setCategories(res.data.map(category => ({
                ...category,
                isChecked: false
            })));
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu danh mục:', error);
        }
    };
    const getAllColor = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/color");
            setColors(res.data.map(color => ({
                ...color,
                isChecked: false
            })));
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu danh mục:', error);
        }
    };
    const getAllSize = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/size");
            setSizes(res.data.map(size => ({
                ...size,
                isChecked: false
            })));
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu danh mục:', error);
        }
    };
    const getMaxPrice = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/product/get-price-filter");
            setPriceRange({
                ...priceRange,
                maxPrice: res.data
            })
            setFilter({
                ...filter,
                priceFilterMax: res.data
            })
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu danh mục:', error);
        }
    };
    useEffect(() => {
        getAllCategories();
        getAllSize();
        getAllColor();
        getMaxPrice();
    }, []);

    useEffect(() => {
        onFilterChange(filter);
    }, [filter]);

    const handleCategoryChange = (selectedItem) => {
        setCategories(categories.map(item =>
            item.id === selectedItem.id ? { ...item, isChecked: true } : { ...item, isChecked: false }
        ));

        setFilter(prevFilter => ({
            ...prevFilter,
            categories: selectedItem.id
        }));
    };
    const handleColorChange = (selectedItem) => {
        const updatedColors = colors.map(item =>
            item.id === selectedItem.id ? { ...item, isChecked: !item.isChecked } : item
        );
        setColors(updatedColors);

        const selectedColors = updatedColors
            .filter(item => item.isChecked)
            .map(item => item.id);

        setFilter(prevFilter => ({
            ...prevFilter,
            color: selectedColors
        }));
    };

    const handleSizeChange = (selectedItem) => {
        const updatedSizes = sizes.map(item =>
            item.id === selectedItem.id ? { ...item, isChecked: !item.isChecked } : item
        );
        setSizes(updatedSizes);

        const selectedSizes = updatedSizes
            .filter(item => item.isChecked)
            .map(item => item.id);

        setFilter(prevFilter => ({
            ...prevFilter,
            size: selectedSizes
        }));
    };

    const handlePriceChange = (e) => {
        setFilter({ ...filter, priceFilterMax: Number(e.target.value) });
    };
    const formatCurrency = (money) => {
        if (money === undefined) {
            return 0;
        }
        return money.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    }
    return (
        <>
            <h4>Bộ lọc sản phẩm</h4>
            <div className="price-filter mb-3">
                <p>Theo giá</p>
                <div>
                    <div className="label">
                        <span>Min: {formatCurrency(filter.priceFilterMin)}</span>
                        <span>Max: {formatCurrency(filter.priceFilterMax)}</span>
                    </div>
                    <input
                        type="range"
                        className="form-range"
                        min={priceRange.minPrice}
                        max={priceRange.maxPrice}
                        value={filter.priceFilterMax}
                        onChange={handlePriceChange}
                    />
                </div>
            </div>
            <div className="category mb-3">
                <p>Danh mục</p>
                <div>
                    {categories.map(item => (
                        <div className="form-check" key={item.id}>
                            <input
                                className="form-check-input"
                                type="radio" // Thay đổi ở đây
                                name="category" // Thêm thuộc tính name để nhóm radio buttons
                                value={item.id}
                                id={`category-${item.id}`}
                                checked={item.isChecked}
                                onChange={() => handleCategoryChange(item)}
                            />
                            <label className="form-check-label" htmlFor={`category-${item.id}`}>
                                {item.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="color mb-3">
                <p>Màu sắc</p>
                <div>
                    {colors.map(item => (
                        <div className="form-check" key={item.id}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={item.id}
                                id={`color-${item.id}`}
                                checked={item.isChecked}
                                onChange={() => handleColorChange(item)}
                            />
                            <label className="form-check-label" htmlFor={`color-${item.id}`}>
                                {item.colorName}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="size mb-3">
                <p>Theo size</p>
                <div>
                    {sizes.map(item => (
                        <div className="form-check" key={item.id}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={item.id}
                                id={`size-${item.id}`}
                                checked={item.isChecked}
                                onChange={() => handleSizeChange(item)}
                            />
                            <label className="form-check-label" htmlFor={`size-${item.id}`}>
                                {item.sizeName}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SidebarFilter;