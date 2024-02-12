import { useState } from 'react';
import { Label } from '../../../components/Cabs/CabBox';
import { InputBox } from '../../../components/Inputbox/GoogleInputBoc';
import Button from '../../../components/Inputbox/Button';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminTabWrapper from '../../../components/admin/AdminTabWrapper';
import { Editor } from '../../../components/Inputbox/Editor';
import { PickImageFile } from '../../../components/picker/ImagePicker';
import { apiRequest, withErrorHandling } from '../../../helper/apiRequest';
import { toast } from 'react-toastify';

function AddNewBlog() {
    const [loading, setLoading] = useState(false);
    // State management for inputs
    const [blogTitle, setBlogTitle] = useState('');
    const [blogDescription, setBlogDescription] = useState('');
    const [blogKeywords, setBlogKeywords] = useState('');
    const [blogImage, setBlogImage] = useState("");
    const [blog, setBlog] = useState("")

    const resetState = () => {
        setLoading(false);
        setBlogTitle('');
        setBlogDescription('');
        setBlogKeywords('');
        setBlogImage('');
        setBlog('');
    };

    const sendRequest = async () => {
        setLoading(true)
        const res = await apiRequest<any>({
            path: "/api/admin/blog", 'method': "POST", data: {
                title: blogTitle, description: blogDescription, keywords: blogDescription, image: blogImage, content: blog
            },
            isAdmin: true
        })
        toast.success(res.data.message);
        resetState();
    };
    const onError = () => {
        setLoading(false)
    }
    const handleSaveBlog = withErrorHandling(sendRequest, onError)

    return (
        <>

            <AdminNavbar />
            <AdminTabWrapper>
                <h1 className='text-xl font-bold mb-8'>Add New Blog Post</h1>
                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="">
                            <Label>Blog Image</Label>
                            {/* <InputFileBox onChange={handleImageChange} /> */}
                            <PickImageFile onChange={(e) => setBlogImage(e)} value={blogImage} />
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
                <Button disabled={loading} className="mt-5 mb-8" onClick={handleSaveBlog}> {loading ? "Saving..." : "Save Blog"} </Button>
            </AdminTabWrapper>

        </>
    );
}

export default AddNewBlog;
