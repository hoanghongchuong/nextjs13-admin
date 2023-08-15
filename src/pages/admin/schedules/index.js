import AdminLayout from "@/components/layout/admin";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";
import Head from "next/head";
import Link from "next/link";
import { useRef, useState } from "react";

export default function SchedulePage() {
    const [openModal, setOpenModal] = useState(false);
    const calendarRef = useRef(null);

    const handleDatesSet = (date) => {
        console.log({date})
        // cal api get event
    }

    const handleEventClick = (date) => {
        console.log(date.event.title)
        console.log(date.event.start)
        console.log(date.event.end)
    }
    const handleDateClick = (arg) => {
        console.log(arg)
    }

  return (
    <div>
      <Head>
        <title>Thời khóa biểu</title>
        <meta property="og:title" content=">Thời khóa biểu" key="title" />
      </Head>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Thời khóa biểu</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link href="#">Home</Link>
                </li>
                <li className="breadcrumb-item active">Thời khóa biểu</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row mb-3">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="timeGridDay"
              eventClick = {handleEventClick}
              datesSet={(date) => handleDatesSet(date)}
              dateClick={handleDateClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

SchedulePage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
