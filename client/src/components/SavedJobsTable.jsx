import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableHeader, TableRow } from './ui/table';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const SavedJobsTable = () => {
    const { savedJobs } = useSelector(store => store.auth);

    // Check if savedJobs is empty or not
    if (!savedJobs || savedJobs.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center text-gray-400 py-5">
                    <p>No saved jobs available.</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="overflow-x-auto">
                <Table className="table-auto w-full border border-gray-700 rounded-lg bg-gray-800 text-gray-200">
                    <TableHeader>
                        <TableRow className="bg-gray-900 text-gray-200">
                            <TableCell className="border-b border-gray-700 px-4 py-3">Title</TableCell>
                            <TableCell className="border-b border-gray-700 px-4 py-3">Location</TableCell>
                            <TableCell className="border-b border-gray-700 px-4 py-3">Salary</TableCell>
                            <TableCell className="border-b border-gray-700 px-4 py-3">No. of Positions</TableCell>
                            <TableCell className="border-b border-gray-700 px-4 py-3">View</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {savedJobs.map((job, index) => {
                            const { _id, title, location, salary, position } = job;
                            return (
                                <motion.tr
                                    key={_id}  // Ensure a unique key is used for each row
                                    className="hover:bg-gray-700 transition-colors duration-300"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <TableCell className="border-b border-gray-700 px-4 py-3">{title}</TableCell>
                                    <TableCell className="border-b border-gray-700 px-4 py-3">{location}</TableCell>
                                    <TableCell className="border-b border-gray-700 px-4 py-3">{salary}</TableCell>
                                    <TableCell className="border-b border-gray-700 px-4 py-3">{position}</TableCell>
                                    <TableCell className="border-b border-gray-700 px-4 py-3">
                                        <Link to={`/description/${_id}`}>
                                            <Eye className="text-gray-400 hover:text-gray-200 transition-colors duration-300" />
                                        </Link>
                                    </TableCell>
                                </motion.tr>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    );
};

export default SavedJobsTable;
