import { useEffect, useState } from 'react';
import { Label } from '../../../components/Cabs/CabBox';
import { InputBox } from '../../../components/Inputbox/GoogleInputBoc';
import Button from '../../../components/Inputbox/Button';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import AdminTabWrapper from '../../../components/admin/AdminTabWrapper';
import { Editor } from '../../../components/Inputbox/Editor';
import { PickImageFile } from '../../../components/picker/ImagePicker';
import { apiRequest, withErrorHandling } from '../../../helper/apiRequest';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Loader from '../../../pages/error/Loader';

function UpdateBlog() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    // State management for inputs
    const [blogTitle, setBlogTitle] = useState('');
    const [blogDescription, setBlogDescription] = useState('');
    const [blogKeywords, setBlogKeywords] = useState('');
    const [blogImage, setBlogImage] = useState("");
    const [blog, setBlog] = useState("")



    const sendRequest = async () => {
        setLoading(true)
        const res = await apiRequest<any>({
            path: "/api/admin/blog/" + id, 'method': "PUT", data: {
                title: blogTitle, description: blogDescription, keywords: blogKeywords, image: blogImage, content: blog
            },
            isAdmin: true
        })
        toast.success(res.data.message);
        setLoading(false)
    };
    const onError = () => {
        setLoading(false)
    }
    const handleSaveBlog = withErrorHandling(sendRequest, onError)


    const loadRequest = async () => {
        setLoadingData(true)
        const res = await apiRequest<any>({
            path: "/api/admin/blog/" + id, 'method': "GET",
            isAdmin: true
        });
        const blog: any = res.data;
        setLoadingData(false)
        setLoading(false);
        setBlogTitle(blog.title);
        setBlogDescription(blog.description);
        setBlogKeywords(blog.keywords);
        setBlogImage(blog.image);
        setBlog(blog.content);
    };
    const onLoadError = () => {
        setLoadingData(false)
    }

    const handleLoadBlog = withErrorHandling(loadRequest, onLoadError)

    useEffect(() => {
        handleLoadBlog();
    }, [])


    return (
        <>

            <AdminNavbar />
            <AdminTabWrapper>
                <h1 className='text-xl font-bold mb-8'>Update Blog Post</h1>
                {loadingData ? <div className="flex justify-center items-center w-full h-96">
                    <Loader />
                </div> : <div className="flex flex-col gap-5">
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
                </div>}
                <Button disabled={loading} className="mt-5 mb-8" onClick={handleSaveBlog}> {loading ? "Saving..." : "Save Blog"} </Button>
            </AdminTabWrapper>

        </>
    );
}

export default UpdateBlog;
