import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

export default function Note() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageOpen, setIsImageOpen] = useState(false);

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/notes/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete note!');
            }

            navigate('/notes');
        } catch (error) {
            console.error(`Error deleting note with id:${id}`, error)
        }
    }

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch(`http://localhost:8080/notes/${id}`);
                if (!response.ok) throw new Error('Could not fetch note');
                const data = await response.json();
                setTitle(data.title);
                setDescription(data.description);
                setImages(data.images || []);
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
        images.forEach(img => formData.append("images", img));
        try {
            const response = await fetch(`http://localhost:8080/notes/${id}`, {
                method: 'PUT',
                body: formData,
            });
            if (!response.ok) throw new Error('Failed to update note');

            setTitle(editedTitle);
            setDescription(editedDescription);
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


    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '65vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    border: '1px solid black',
                    borderRadius: 2,
                    paddingTop: 5,
                    minHeight: '600px',
                    width: '600px',
                    height: '100%',
                    position: 'relative',
                }}
            >
                {isEditing ? (
                    <>
                        <TextField
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            sx={{ width: '25ch', mx: 'auto', my: '' }}
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
                            sx={{ width: '60ch' }}
                        />
                    </>
                ) : (
                    <>
                        <Typography variant="h4" gutterBottom>
                            {title || `No note with ID ${id} exists`}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                wordBreak: 'break-word',
                                whiteSpace: 'pre-wrap',
                                overflowWrap: 'break-word',
                                marginX: 6,
                            }}
                        >
                            {description}
                        </Typography>
                    </>
                )}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                        justifyContent: 'center',
                        marginTop: 2,
                    }}
                >
                    {images.map((img) => (
                        <Box
                            key={img.id}
                            component="img"
                            src={`http://localhost:8080/${img.path.replace(/\\/g, '/')}`}
                            alt={`${img.fileName}`}
                            onClick={() => handleImageClick(img)}
                            sx={{
                                maxWidth: '100%',
                                maxHeight: 200,
                                objectFit: 'cover',
                                cursor: 'pointer',
                                borderRadius: 1,
                                boxShadow: 1,
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                },
                            }}
                        />
                    ))}
                </Box>
                <Box sx={{
                    mt: 'auto',
                    display: 'flex',
                    mb: 3,
                }}>
                    {title && <Box sx={{ flexGrow: 1, display: 'flex', gap: 2, mt: 2 }}>
                        {isEditing ? (
                            <>
                                <Button variant="contained" onClick={handleSaveEdit}>Save</Button>
                                <Button variant="outlined" onClick={() => setIsEditing(false)}>Cancel</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outlined" onClick={() => {
                                    setEditedTitle(title);
                                    setEditedDescription(description);
                                    setIsEditing(true);
                                }}>Edit</Button>
                                <Button variant="contained" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </>
                        )}
                    </Box>}
                </Box>

            </Box>
            <Dialog open={isImageOpen} onClose={handleCloseImage} maxWidth="md" >
                <DialogContent sx={{ p: 0, display: 'flex' }}>
                    {selectedImage && (
                        <Box
                            component="img"
                            src={`http://localhost:8080/${selectedImage.path.replace(/\\/g, '/')}`}
                            alt={selectedImage.fileName}
                            sx={{ width: '100%', height: '100%' }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}
