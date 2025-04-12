import React, { useRef } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
} from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';

const PAGE_SIZE = 10;

const StreamTable = ({ data }) => {
  const [page, setPage] = React.useState(1);
  
  const parentRef = useRef();

  const currentData = React.useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [page, data]);

  const rowVirtualizer = useVirtualizer({
    count: currentData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 100,
  });

  return (
    <Paper sx={{ mt: 3, p: 2 }}>
      <Box
        ref={parentRef}
        sx={{ height: 400, overflow: 'auto' }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Enabled</TableCell>
              <TableCell>Running</TableCell>
              <TableCell>Last Playback</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = currentData[virtualRow.index];
                return (
                  <TableRow
                    key={row.id}
                    style={{
                      top: 0,
                      left: 0,
                      transform: `translateY(${virtualRow.start}px)`,
                      width: '100%',
                    }}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.url}</TableCell>
                    <TableCell>{row.is_enabled ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{row.is_playing ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{row.last_playback}</TableCell>
                    <TableCell>{row.created_at}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Box>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(data.length / PAGE_SIZE)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Paper>
  );
};

export default StreamTable;
