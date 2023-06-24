import AdminLayout from '@/components/layout/admin';
import React from 'react';

function Dashboard(props) {
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;


Dashboard.getLayout = function getLayout(page) {
    return (
        <AdminLayout>{page}</AdminLayout>
    )
}