import AdminLayout from '@/components/layout/admin';
import React from 'react';

function ProductList(props) {
    return (
        <div>
            product list
        </div>
    );
}

export default ProductList;


ProductList.getLayout = function getLayout(page) {
    return (
        <AdminLayout>{page}</AdminLayout>
    )
}