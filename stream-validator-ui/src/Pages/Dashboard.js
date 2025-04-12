import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import StreamForm from '../Components/StreamForm';
import StreamTable from '../Components/StreamTable';
import { addStream, connectToSupabase, getStreams } from '../Utils/SupabaseUtils';

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [streams, setStreams] = useState([]);

  // Fetch Stream data
  useEffect(() => {
      const getStreamsFromSupabase = async () => {
        const supabase = await connectToSupabase();
        const result = await getStreams(supabase);
        setStreams(result);
      }
      getStreamsFromSupabase();
  }, []);

  // SubmissionCallback
  const submissionCallback = async (formData) => {
    const supabase = await connectToSupabase();
    const newStream = await addStream(supabase, formData);

    // Add new data to form
    const curStreams = streams;
    curStreams.push(newStream);
    console.log("TESTING: ", newStream);
    setStreams(curStreams);
    handleCloseForm();
  };

  // Forcing re-render when new entry is added to form
  useEffect(() => {

  }, [streams]);

  const handleOpenForm = () => setOpen(true);
  const handleCloseForm = () => setOpen(false);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Stream overview
      </Typography>

      <Button variant="contained" color="primary" onClick={handleOpenForm}>
        Add Stream
      </Button>
      
      <StreamTable data={streams}/>

      <Dialog open={open} onClose={handleCloseForm} fullWidth maxWidth="sm">
        <DialogContent>
          <StreamForm submissionCallback={(formData) => {submissionCallback(formData)}} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
