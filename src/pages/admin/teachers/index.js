import React from 'react';
import AdminLayout from '@/components/layout/admin';

function TeacherList(props) {
    return (
        <div>
            tearch list page
        </div>
    );
}

export default TeacherList;

TeacherList.getLayout = function getLayout(page) {
    return (
        <AdminLayout>{page}</AdminLayout>
    )
}