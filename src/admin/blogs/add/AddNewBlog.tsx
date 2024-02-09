import { useState } from 'react';
import { Label } from '../../../components/Cabs/CabBox';
import { InputBox, InputFileBox } from '../../../components/Inputbox/GoogleInputBoc';
import Button from '../../../components/Inputbox/Button';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminTabWrapper from '../../../components/admin/AdminTabWrapper';
import { Editor } from '../../../components/Inputbox/Editor';

function AddNewBlog() {
    // State management for inputs
    const [blogTitle, setBlogTitle] = useState('');
    const [blogDescription, setBlogDescription] = useState('');
    const [blogKeywords, setBlogKeywords] = useState('');
    const [blogImage, setBlogImage] = useState(null);
    const [blog, setBlog] = useState("")

    // Handler for updating blog image
    const handleImageChange = (e: any) => {
        setBlogImage(e.target.files[0]); // Assuming only one file will be selected
    };

    // Handler for saving the blog
    const handleSaveBlog = () => {
        // You can use the state variables here to save the blog
        console.log("Blog Title:", blogTitle);
        console.log("Blog Description:", blogDescription);
        console.log("Blog Keywords:", blogKeywords);
        console.log("Blog Image:", blogImage);
        // Add logic to save the blog
    };

    return (
        <>

            <AdminNavbar />
            <AdminTabWrapper>
                <h1 className='text-xl font-bold mb-8'>Add New Blog Post</h1>
                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="">
                            <Label>Blog Image</Label>
                            <InputFileBox onChange={handleImageChange} />
                        </div>
                        <div className="">
                            <Label>Blog Title</Label>
                            <InputBox value={blogTitle} onChange={(e) => setBlogTitle(e)} />
                        </div>
                    </div>
                    <div className="">
                        <Label>Blog Description</Label>
                        <textarea className="border focus:outline-none p-4 w-full" value={blogDescription} onChange={(e) => setBlogDescription(e.target.value)}></textarea>
                    </div>
                    <div className="mb-5">
                        <Label>Blog Keywords</Label>
                        <InputBox value={blogKeywords} onChange={(e) => setBlogKeywords(e)} />
                    </div>
                    <Editor value={blog} onChenge={(e) => setBlog(e)} />
                </div>
                <Button className="mt-5 mb-8" onClick={handleSaveBlog}> Save Blog </Button>
            </AdminTabWrapper>

        </>
    );
}

export default AddNewBlog;
