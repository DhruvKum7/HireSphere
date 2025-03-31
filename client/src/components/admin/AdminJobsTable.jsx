import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Delete, Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <motion.div
            initial={ { opacity: 0 } }
            animate={ { opacity: 1 } }
            transition={ { duration: 0.5 } }
            className="overflow-x-auto"
        >
            <Table className="border border-blue-300 rounded-xl min-w-full">
                <TableCaption className="text-center">A list of your recently posted jobs</TableCaption>
                <TableHeader>

                    <TableRow>
                        <TableHead className="py-4 px-6">Company Name</TableHead>
                        <TableHead className="py-4 px-6">Role</TableHead>
                        <TableHead className="py-4 px-6">Date</TableHead>
                        <TableHead className="py-4 px-6 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { filterJobs?.map((job) => (
                        <motion.tr
                            key={ job._id }
                            initial={ { opacity: 0 } }
                            animate={ { opacity: 1 } }
                            transition={ { duration: 0.3 } }
                            className="hover:bg-blue-100 border-t border-gray-200"
                        >
                            <TableCell className="py-4 px-6 whitespace-nowrap">{ job?.company?.name }</TableCell>
                            <TableCell className="py-4 px-6 whitespace-nowrap">{ job?.title }</TableCell>
                            <TableCell className="py-4 px-6 whitespace-nowrap">{ job?.createdAt.split("T")[0] }</TableCell>
                            <TableCell className="py-4 px-6 text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="text-blue-600 hover:text-blue-500" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 bg-white shadow-md rounded-md">
                                        <div
                                            onClick={ () => navigate(`/admin/companies/${job._id}`) }
                                            className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-500 p-2"
                                        >
                                            <Edit2 className="w-4" />
                                            <span>Edit</span>
                                        </div>
                                        <div
                                            onClick={ () => navigate(`/admin/jobs/${job._id}/applicants`) }
                                            className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-500 p-2"
                                        >
                                            <Eye className="w-4" />
                                            <span>Applicants</span>
                                        </div>

                                        <div
                                            onClick={ () => navigate(`/admin/jobs/${job._id}/applicants`) }
                                            className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-500 p-2"
                                        >
                                            <Delete className="w-4" />
                                            <span>Delete</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </motion.tr>
                    )) }
                </TableBody>
            </Table>
        </motion.div>
    );
}

export default AdminJobsTable;
