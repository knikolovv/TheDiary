import { Dialog, TextField, Box, Typography, Switch, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/de";
import "dayjs/locale/en-gb";
import "dayjs/locale/zh-cn";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import StyledButton from "./StyledButton";

export default function EventDialog({
    open,
    onClose,
    eventData,
    onDelete,
    onUpdate,
    onCreate
}) {
    const [mode, setMode] = useState("view");
    const [title, setTitle] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [allDay, setAllDay] = useState(false);
    const [titleError, setTitleError] = useState("");
    const [dateError, setDateError] = useState("");

    const fullDateTime = date
        ?.hour(time?.hour())
        ?.minute(time?.minute());

    useEffect(() => {
        if (open) {
            if (eventData) {
                setMode("view");
                setTitle(eventData.title || "");
                setDate(eventData.start ? dayjs(eventData.start) : null);
                setTime(eventData.start ? dayjs(eventData.start) : null);
                setAllDay(eventData.allDay || false);
            } else {
                setMode("create");
                setTitle("");
                setDate(dayjs());
                setTime(dayjs());
                setAllDay(false);
            }
            setTitleError("");
            setDateError("");
        }
    }, [open, eventData]);

    const handleCreate = () => {
        if (!title.trim()) {
            setTitleError("Title is required");
            return;
        } else {
            setTitleError("");
        }

        if (!date || !date.isValid()) {
            setDateError("Valid date is required");
            return;
        } else {
            setDateError("");
        }

        const combinedDateTime = date
            .hour(time.hour())
            .minute(time.minute())
            .second(0);

        const eventDateTime = combinedDateTime.format("YYYY-MM-DD HH:mm");

        if (mode === "create") {
            const newEvent = {
                title: title,
                eventDateTime: eventDateTime,
                createdDate: dayjs().format("YYYY-MM-DD"),
                allDay: allDay,
            };
            onCreate(newEvent);
        } else if (mode === "edit") {
            const updatedEvent = {
                id: Number(eventData?.id),
                title: title,
                eventDateTime: eventDateTime,
                createdDate: eventData?.extendedProps?.createdOn || dayjs().format("YYYY-MM-DD"),
                allDay: allDay,
            };
            onUpdate(eventData?.id, updatedEvent);
        }
        onClose();
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <Box
                sx={{
                    p: 2,
                    minWidth: 400,
                    minHeight: 250,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
                }}
            >
                <h2>
                    {mode === "create" && "Create Event"}
                    {mode === "edit" && "Edit Event"}
                    {mode === "view" && title}
                </h2>

                {mode === "view" && (
                    <>
                        <p><strong>Time of event:</strong>
                            {eventData?.allDay ? " All day" : " " + fullDateTime?.format("YYYY-MM-DD HH:mm")}
                        </p>
                        <Box sx={{ flexGrow: 1 }} />

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mt: 2,
                                pt: 1,
                            }}
                        >
                            <Box>
                                <StyledButton onClick={onClose}>Close</StyledButton>
                                <StyledButton onClick={() => setMode("edit")}>Edit</StyledButton>
                                <StyledButton onClick={() => onDelete?.(eventData?.id)}>Delete</StyledButton>
                            </Box>
                            <Typography variant="caption" sx={{ color: "gray", alignSelf: "end", marginLeft: 10 }}>
                                Created: {eventData?.extendedProps?.createdOn}
                            </Typography>
                        </Box>
                    </>
                )}

                {(mode === "create" || mode === "edit") && (
                    <form onSubmit={(e) => { e.preventDefault(); handleCreate() }}>
                        <TextField
                            fullWidth
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            margin="normal"
                            error={!!titleError}
                            helperText={titleError}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"en-gb"}>
                            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                                <DateField
                                    label="Date"
                                    value={date}
                                    onChange={(newValue) => setDate(newValue)}
                                    sx={{ flex: 1, maxWidth: "225px" }}
                                    slotProps={{
                                        textField: {
                                            error: !!dateError,
                                            helperText: dateError,
                                        }
                                    }}
                                />
                                {!allDay && <TimeField
                                    label="Time"
                                    value={time}
                                    onChange={(newValue) => setTime(newValue)}
                                    sx={{ flex: 1, width: "225px" }}
                                />}
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={allDay}
                                            onChange={(e) => setAllDay(e.target.checked)}
                                        />
                                    }
                                    label="All Day"
                                />
                            </Box>
                        </LocalizationProvider>
                        <div style={{ marginTop: "16px" }}>
                            <StyledButton onClick={onClose}>Cancel</StyledButton>
                            <StyledButton type="submit" >Create</StyledButton>
                        </div>
                    </form>
                )}
            </Box>
        </Dialog>
    );
}
