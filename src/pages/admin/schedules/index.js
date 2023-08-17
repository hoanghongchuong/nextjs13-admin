import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import { scheduleApi } from "@/api-client/schedule-api";
import AdminLayout from "@/components/layout/admin";
import Skeleton from "react-loading-skeleton";
import { Button, Modal } from "react-bootstrap";

export default function SchedulePage() {
  const [showModalEvent, setShowModalEvent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listEvent, setListEvent] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    if (selectedDateRange) {
      fetchSchedule(selectedDateRange);
    }
  }, [selectedDateRange]);

  const handleDatesSet = async (date) => {
    setSelectedDateRange({
      start: moment(date.start).format("Y-MM-D HH:mm:ss"),
      end: moment(date.end).format("Y-MM-D HH:mm:ss"),
    });
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b style={{ marginRight: "5px" }}>{eventInfo.timeText}</b>{" "}
        <i> {eventInfo.event.title}</i>
      </>
    );
  };

  const fetchSchedule = async (dateRange) => {
    try {
      setIsLoading(true);

      const { start, end } = dateRange;
      const response = await scheduleApi.getListSchedule(start, end);
      setListEvent(response.data);
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventClick = (date) => {
    setShowModalEvent(true);
    console.log(date.event.id);
    console.log(date.event.title);
    console.log(date.event.start);
    console.log(date.event.end);
  };
  const handleDateClick = (arg) => {
    console.log(arg);
  };

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
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              initialView="dayGridMonth"
              eventContent={renderEventContent}
              events={listEvent}
              eventClick={handleEventClick}
              datesSet={(date) => handleDatesSet(date)}
              dateClick={handleDateClick}
              eventTimeFormat={{
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }}
              displayEventEnd={true}
            />
          </div>
        </div>
      </div>
      <Modal
        show={showModalEvent}
        onHide={() => setShowModalEvent(false)}
        animation={true}
      >
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="border-0 fs-4">
          Thôn tin lớp học
        </Modal.Body>
        <div className="border-0 p-3 text-end">
          <Button
            variant="secondary"
            className="me-2"
            onClick={() => setShowModalEvent(false)}
          >
            Ok
          </Button>
          
        </div>
      </Modal>
    </div>
  );
}

SchedulePage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
