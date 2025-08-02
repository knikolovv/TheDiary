import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import PinButton from "../components/PinButton";
import StyledButton from "../components/StyledButton";

export default function Note() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pinned, setPinned] = useState(false);
    const [images, setImages] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedPinned, setEditedPinned] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageOpen, setIsImageOpen] = useState(false);

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/notes/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("Failed to delete note!");
            }
            navigate("/notes");
        } catch (error) {
            console.error(`Error deleting note with id:${id}`, error)
        }
    }

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch(`http://localhost:8080/notes/${id}`);
                if (!response.ok) throw new Error("Could not fetch note");
                const data = await response.json();
                setTitle(data.title);
                setDescription(data.description);
                setImages(data.images || []);
                setPinned(data.pinned || false);
            } catch (error) {
                console.error(`Error fetching note with id: ${id}`, error);
            }
        };
        fetchNote();
    }, [id]);

    const handleSaveEdit = async () => {
        const formData = new FormData();
        formData.append("title", editedTitle);
        formData.append("description", editedDescription);
        formData.append("isPinned", editedPinned);
        images.forEach(img => formData.append("images", img));
        try {
            const response = await fetch(`http://localhost:8080/notes/${id}`, {
                method: "PUT",
                body: formData,
            });
            if (!response.ok) throw new Error("Failed to update note");

            setTitle(editedTitle);
            setDescription(editedDescription);
            setPinned(editedPinned);
            setIsEditing(false);
        } catch (error) {
            console.error(`Error saving note with id: ${id}`, error);
        }
    };


    const handleImageClick = (img) => {
        setSelectedImage(img);
        setIsImageOpen(true);
    };

    const handleCloseImage = () => {
        setIsImageOpen(false);
        setSelectedImage(null);
    };

    const handleDeleteImage = async (imgId) => {
        try {
            const response = await fetch(`http://localhost:8080/images/${imgId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete image");
            }
            setImages((prevImages) => prevImages.filter((img) => img.id !== imgId));
        } catch (error) {
            console.error(`Error deleting image with id: ${imgId}`, error);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                py: 4,
                overflowY: "auto",
                boxSizing: "border-box",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    border: "1px solid black",
                    borderRadius: 2,
                    paddingTop: 5,
                    minHeight: "700px",
                    width: "100%",
                    maxWidth: "700px",
                    position: "relative",
                    backgroundColor: "#BDB8AD"
                }}
            >
                <PinButton
                    pinned={isEditing ? editedPinned : pinned}
                    editable={isEditing}
                    onToggle={() => setEditedPinned(!editedPinned)}
                />

                {isEditing ? (
                    <>
                        <TextField
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            sx={{ width: "25ch", mx: "auto", my: "" }}
                            label="Note Title"
                            variant="standard"
                            required
                        />
                        <TextField
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            label="Description"
                            multiline
                            rows={10}
                            variant="outlined"
                            sx={{ width: "60ch" }}
                        />
                    </>
                ) : (
                    <>
                        <Typography variant="h4" gutterBottom>
                            {title}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                wordBreak: "break-word",
                                whiteSpace: "pre-wrap",
                                overflowWrap: "break-word",
                                marginX: 6,
                            }}
                        >
                            {description}
                        </Typography>
                    </>
                )}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        justifyContent: "center",
                        marginTop: 2,
                    }}
                >
                    {images.map((img) => (
                        <Box
                            key={img.id}
                            sx={{
                                position: "relative",
                                display: "inline-block",
                            }}
                        >
                            <Box
                                component="img"
                                src={`http://localhost:8080/${img.path.replace(/\\/g, "/")}`}
                                alt={img.fileName}
                                onClick={() => !isEditing && handleImageClick(img)}
                                sx={{
                                    maxWidth: "100%",
                                    maxHeight: 200,
                                    objectFit: "cover",
                                    cursor: isEditing ? "default" : "pointer",
                                    borderRadius: 1,
                                    boxShadow: 1,
                                    transition: "transform 0.2s",
                                    "&:hover": {
                                        transform: !isEditing ? "scale(1.03)" : undefined,
                                    },
                                }}
                            />
                            {isEditing && (
                                <button
                                    onClick={() => handleDeleteImage(img.id)}
                                    style={{
                                        position: "absolute",
                                        top: "2px",
                                        right: "2px",
                                        minWidth: "15px",
                                        height: "15px",
                                        padding: 0,
                                        color: "white",
                                        backgroundColor: "rgba(0,0,0,0.6)",
                                        border: "none",
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.8)")}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.6)")}
                                >
                                    ×
                                </button>
                            )}
                        </Box>
                    ))}
                </Box>
                <Box sx={{
                    mt: "auto",
                    display: "flex",
                    mb: 3,
                }}>
                    {title && <Box sx={{ flexGrow: 1, display: "flex", mt: 2 }}>
                        {isEditing ? (
                            <>
                                <StyledButton onClick={handleSaveEdit}>Save</StyledButton>
                                <StyledButton onClick={() => setIsEditing(false)}>Cancel</StyledButton>
                            </>
                        ) : (
                            <>
                                <StyledButton onClick={() => {
                                    setEditedTitle(title);
                                    setEditedDescription(description);
                                    setEditedPinned(pinned);
                                    setIsEditing(true);
                                }}>Edit</StyledButton>
                                <StyledButton variant="contained" onClick={handleDelete}>
                                    Delete
                                </StyledButton>
                            </>
                        )}
                    </Box>}
                </Box>
            </Box>
            <Dialog open={isImageOpen} onClose={handleCloseImage} maxWidth="md" >
                <DialogContent sx={{ p: 0, display: "flex" }}>
                    {selectedImage && (
                        <Box
                            component="img"
                            src={`http://localhost:8080/${selectedImage.path.replace(/\\/g, "/")}`}
                            alt={selectedImage.fileName}
                            sx={{ width: "100%", height: "100%" }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}
