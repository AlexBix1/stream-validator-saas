import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Paper
  } from '@mui/material';

  const StreamForm = (submissionCallback) => {
    const [formData, setFormData] = useState({
      name: '',
      url: '',
      tags: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      submissionCallback && submissionCallback.submissionCallback(formData);
    };
  
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
          <Typography variant="h5" gutterBottom>
            Add a stream
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              margin="normal"
              label="Stream Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Stream URL"
              name="url"
              type="url"
              value={formData.url}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Tags"
              name="tags"
              type="tags"
              value={formData.tags}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              fullWidth
            >
              Add Stream
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  };
  
  export default StreamForm; 