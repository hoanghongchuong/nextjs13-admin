import studentApi from '@/api-client/student-api';
import AdminLayout from '@/components/layout/admin';
import React, { useEffect } from 'react';

function Dashboard(props) {
    useEffect(() => {
        ;(async () => {
          try {
            const response = await studentApi.getListStudent({});
            // const data = await response.json();
            console.log({response});
          } catch (error) {
            console.log({error});
          }
        })()
      }, [])


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