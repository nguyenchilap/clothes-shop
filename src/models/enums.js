const PRODUCT_UNIT = {
    SINGLE: {
        code: 1,
        name: 'Cái',
    },
    SET: {
        code: 2,
        name: 'Bộ',
    },
    ONE: {
        code: 3,
        name: 'Chiếc',
    },
    DOUBLE: {
        code: 4,
        name: 'Đôi',
    },
    BOX: {
        code: 5,
        name: 'Hộp',
    }
}

const CATEGORIES = [
    {
        name: 'root',
        parent_id: null,
        is_primary: false,
    },
    {
        name: 'Áo quần',
        parent_id: 0,
        is_primary: false,
    },
    {
        name: 'Giày dép',
        parent_id: 0,
        is_primary: false,
    },
    {
        name: 'Phụ kiện',
        parent_id: 0,
        is_primary: false,
    },
    {
        name: 'Mũ nón',
        parent_id: 0,
        is_primary: false,
    },
    {
        name: 'Túi xách, cặp',
        parent_id: 0,
        is_primary: false,
    },
    {
        name: 'Trang sức',
        parent_id: 0,
        is_primary: false,
    },
    {
        name: 'Áo',
        parent_id: 1,
        is_primary: true,
    },
    {
        name: 'Đầm, váy',
        parent_id: 1,
        is_primary: true,
    },
    {
        name: 'Set bộ, jumpsuit',
        parent_id: 1,
        is_primary: true,
    },
    {
        name: 'Đồ lót',
        parent_id: 1,
        is_primary: true,
    },
    {
        name: 'Quần',
        parent_id: 1,
        is_primary: true,
    },
    {
        name: 'Đồ mặc nhà, đồ ngủ',
        parent_id: 1,
        is_primary: true,
    },
    {
        name: 'Áo khoác',
        parent_id: 1,
        is_primary: true,
    },
    {
        name: 'Đồ bơi, đi biển',
        parent_id: 1,
        is_primary: true,
    },
    {
        name: 'Đầm, váy',
        parent_id: 1,
        is_primary: true,
    },
    {
        name: 'Đồ unisex',
        parent_id: 1,
        is_primary: true,
    },
    {
        name: 'Đồ thể thao',
        parent_id: 1,
        is_primary: true,
    },
    {
        name: 'Áo quần khác',
        parent_id: 1,
        is_primary: true,
    },
    {
        name: 'Dép',
        parent_id: 2,
        is_primary: true,
    },
    {
        name: 'Giày cao gót',
        parent_id: 2,
        is_primary: true,
    },
    {
        name: 'Giày sandal',
        parent_id: 2,
        is_primary: true,
    },
    {
        name: 'Giày sneaker',
        parent_id: 2,
        is_primary: true,
    },
    {
        name: 'Giày thể thao',
        parent_id: 2,
        is_primary: true,
    },
    {
        name: 'Giày boot',
        parent_id: 2,
        is_primary: true,
    },
    {
        name: 'Giày tăng chiều cao',
        parent_id: 2,
        is_primary: true,
    },
    {
        name: 'Giày lười, giày mọi, slip-on',
        parent_id: 2,
        is_primary: true,
    },
    {
        name: 'Giày, dép unisex',
        parent_id: 2,
        is_primary: true,
    },
    {
        name: 'Giày, dép đi mưa',
        parent_id: 2,
        is_primary: true,
    },
    {
        name: 'Quần, váy chống nắng',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Tất, vớ',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Nơ cổ, cài áo',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Khăn choàng cổ',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Găng tay',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Cà vạt',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Khăn bịt mắt ngủ',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Khẩu trang',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Chụp tai giữ ấm',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Nơ cổ, cài áo',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Thắt lưng',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Mắt kính',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Cột tóc, kẹp tóc, cài tóc',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Băng đô',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Lược chải',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Móc điện thoại',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Bảo vệ cáp sạc',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Tai nghe',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Phụ kiện khác',
        parent_id: 3,
        is_primary: true,
    },
    {
        name: 'Nón len',
        parent_id: 4,
        is_primary: true,
    },
    {
        name: 'Mũ nồi, Nón beret',
        parent_id: 4,
        is_primary: true,
    },
    {
        name: 'Nón lưỡi trai, Nón kết',
        parent_id: 4,
        is_primary: true,
    },
    {
        name: 'Nón cối',
        parent_id: 4,
        is_primary: true,
    },
    {
        name: 'Nón rộng vành',
        parent_id: 4,
        is_primary: true,
    },
    {
        name: 'Nón snapback',
        parent_id: 4,
        is_primary: true,
    },
    {
        name: 'Nón bucket',
        parent_id: 4,
        is_primary: true,
    },
    {
        name: 'Mũ, nón khác',
        parent_id: 4,
        is_primary: true,
    },
    {
        name: 'Túi tote',
        parent_id: 5,
        is_primary: true,
    },
    {
        name: 'Túi xách tay',
        parent_id: 5,
        is_primary: true,
    },
    {
        name: 'Túi đeo chéo',
        parent_id: 5,
        is_primary: true,
    },
    {
        name: 'Túi handmande, Túi thổ cẩm',
        parent_id: 5,
        is_primary: true,
    },
    {
        name: 'Túi bản to đeo vai',
        parent_id: 5,
        is_primary: true,
    },
    {
        name: 'Balo',
        parent_id: 5,
        is_primary: true,
    },
    {
        name: 'Túi đựng laptop',
        parent_id: 5,
        is_primary: true,
    },
    {
        name: 'Túi đựng điện thoại',
        parent_id: 5,
        is_primary: true,
    },
    {
        name: 'Vali',
        parent_id: 5,
        is_primary: true,
    },
    {
        name: 'Bóp, ví',
        parent_id: 5,
        is_primary: true,
    },
    {
        name: 'Balo, Túi khác',
        parent_id: 5,
        is_primary: true,
    },
    {
        name: 'Vòng cổ, dây chuyền',
        parent_id: 6,
        is_primary: true,
    },
    {
        name: 'Vòng tay, lắc tay',
        parent_id: 6,
        is_primary: true,
    },
    {
        name: 'Lắc chân',
        parent_id: 6,
        is_primary: true,
    },
    {
        name: 'Đồng hồ',
        parent_id: 6,
        is_primary: true,
    },
    {
        name: 'Nhẫn',
        parent_id: 6,
        is_primary: true,
    },
    {
        name: 'Bông tai, khuyên tai',
        parent_id: 6,
        is_primary: true,
    },
    {
        name: 'Trang sức khác',
        parent_id: 6,
        is_primary: true,
    },
]

function getProductUnitByCode(code) {
    for(const value of Object.values(PRODUCT_UNIT)) {
        if (value.code === code) {
            return value.name;
        }
    }
    return 'Code not found';
}

function getRootCategories() {
    return CATEGORIES.map((category, idx) => {
        category.id = idx;
        return category;
    }).filter(category => category.parent_id === 0);
}

function getCategoryByIndex(index) {
    return CATEGORIES.map((category, idx) => {
        category.id = idx;
        return category;
    }).find(category => category.id === index);
}

function getCategoryByName(name) {
    return CATEGORIES.find(category => category.name === name);
}

function getChildCategoriesByParentIndex(parentIndex) {
    return CATEGORIES.map((category, idx) => {
        category.id = idx;
        return category;
    }).filter(category => category.parent_id === parentIndex);
}

function isPrimaryCategory(index) {
    const category = CATEGORIES[index];
    if (category) {
        if (category.is_primary) return true;
        return false;
    }
    return false
}


export {
    PRODUCT_UNIT,
    CATEGORIES,
    isPrimaryCategory,
    getProductUnitByCode,
    getRootCategories,
    getCategoryByIndex,
    getCategoryByName,
    getChildCategoriesByParentIndex,
}