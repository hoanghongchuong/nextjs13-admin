import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as Yup from "yup";
import moment from "moment";
import { scheduleApi } from "@/api-client/schedule-api";
import AdminLayout from "@/components/layout/admin";
import Skeleton from "react-loading-skeleton";
import { Button, Modal } from "react-bootstrap";
import { Form, Formik } from "formik";
import { ClipLoader } from "react-spinners";
import InputField from "@/components/form/input-field";
import LoadingCustom from "@/components/loading/loading";
import Select from "@/components/form/select";
import Textarea from "@/components/form/textarea";
import { useDateFormat } from "@/hooks/use-format-date";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Trường này là bắt buộc."),
  is_open: Yup.number().required("Trường này là bắt buộc."),
  note: Yup.string(),
});

export default function SchedulePage() {
  const formatDate = useDateFormat();
  const [showModalEvent, setShowModalEvent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [listEvent, setListEvent] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [scheduleSelected, setScheduleSelected] = useState(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    if (selectedDateRange) {
      fetchSchedule(selectedDateRange);
    }
  }, [selectedDateRange]);

  const handleDatesSet = async (date) => {
    console.log("sss");
    setSelectedDateRange({
      start: moment(date.start).format("Y-MM-D HH:mm:ss"),
      end: moment(date.end).format("Y-MM-D HH:mm:ss"),
    });
  };

  const initialValues = {
    name: scheduleSelected?.class_room?.name ?? "",
    note: scheduleSelected?.note ?? "",
    is_open: scheduleSelected?.is_open ?? 1,
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b style={{ marginRight: "5px", cursor: "pointer" }}>
          {eventInfo.timeText}
        </b>{" "}
        <i> {eventInfo.event.title}</i>
      </>
    );
  };

  useEffect(() => {
    if (scheduleSelected) {
      setShowModalEvent(true);
    }
  }, [scheduleSelected]);

  const fetchSchedule = async (dateRange) => {
    try {
      const { start, end } = dateRange;
      const response = await scheduleApi.getListSchedule(start, end);
      setListEvent(response.data);
    } catch (error) {
      console.log({ error });
    }
  };

  const getScheduleDetail = async (id) => {
    try {
      setIsLoading(true);
      const response = await scheduleApi.getDetailSchedule(id);
      setScheduleSelected(response.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleEventClick = (date) => {
    const scheduleId = date.event.id;
    getScheduleDetail(scheduleId);

    // console.log(date.event.id);
    // console.log(date.event.title);
    // console.log(date.event.start);
    // console.log(date.event.end);
  };
  const handleDateClick = (arg) => {
    console.log(arg);
  };

  function handleHiddenModal() {
    setShowModalEvent(false);
    setScheduleSelected(null);
  }

  const handleSubmitEditSchedule = async (values) => {
    try {
      setIsSaving(true);
      await scheduleApi.editSchedule(scheduleSelected.id, values);
      setIsSaving(false);
      handleHiddenModal();
    } catch (error) {
      setIsSaving(false)
    }
    
  };

  return (
    <>
      <Head>
        <title>Thời khóa biểu</title>
        <meta property="og:title" content=">Thời khóa biểu" key="title" />
      </Head>

      <div>
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
            {/* {isLoading ? (
              <Skeleton count={11} style={{ display: "block" }} />
            ) : ( */}
            <div className="row mb-3">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                initialView="timeGridWeek"
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
            {/* )} */}
          </div>
        </div>
        <Modal
          show={showModalEvent}
          onHide={() => setShowModalEvent(false)}
          animation={true}
          size="md"
        >
          {/* <Modal.Header closeButton className="border-0"></Modal.Header> */}
          <Modal.Body className="border-0">
            <div className="border-0 p-3">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmitEditSchedule}
              >
                {() => (
                  <div className="row">
                    <Form>
                      <div className="col-md-12 col-12">
                        <div className="card">
                          <div className="card-header-sticky card-header d-flex justify-content-between align-items-center">
                            <h3 className="card-title mb-0">Thông tin lớp</h3>
                            <div className="card-tool"></div>
                          </div>
                          <div className="card-body">
                            <div className="form-group mb-3">
                              <InputField
                                name="name"
                                required
                                type="text"
                                label="Tên lớp học"
                                disabled
                              />
                            </div>
                            <div className="form-group mb-3">
                              <label className="fw-500">Ngày học:</label>
                              <p>
                                <b>
                                  {formatDate(scheduleSelected?.schedule_date)}
                                </b>{" "}
                                {scheduleSelected?.day_name}, từ:{" "}
                                <b>{scheduleSelected?.start_time}</b> đến{" "}
                                <b>{scheduleSelected?.end_time}</b>
                              </p>
                            </div>
                            <div className="form-group mb-3">
                              <Select
                                label="Trạng thái"
                                name="is_open"
                                options={[
                                  { id: 1, name: "Hoạt động" },
                                  { id: 2, name: "Nghỉ" },
                                ]}
                                required
                              />
                            </div>
                            <div className="form-group mb-3">
                              <Textarea
                                name="note"
                                type="text"
                                label="Ghi chú"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 float-end">
                          <Button
                            variant="secondary"
                            onClick={handleHiddenModal}
                            className="me-2"
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            type="submit"
                            disabled={isSaving}
                          >
                            {isSaving ? (
                              <>
                                Saving
                                <ClipLoader color="#3498db" size={6} />
                              </>
                            ) : (
                              <>
                                <i className="fa fa-save"></i> Save
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </div>
                )}
              </Formik>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

SchedulePage.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
