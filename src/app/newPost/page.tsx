'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Select from 'react-select';

interface ConstituencyListType {
    _id: string;
    area_name: string;
}

const NewPostPage = () => {
    const router = useRouter();
    const [postType, setPostType] = useState<'text' | 'poll'>('text'); // 'text' or 'poll'
    const [selectedConstituency, setSelectedConstituency] = useState<ConstituencyListType | null>(null);
    const [constituencyAreaList, setConstituencyAreaList] = useState<ConstituencyListType[]>([]);
    // Update the selectedCategory state type to match react-select's expected format
    const [selectedCategory, setSelectedCategory] = useState<{ value: string; label: string } | null>(null);
    const [postContent, setPostContent] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [loadingConstituencies, setLoadingConstituencies] = useState(true);
    const [errorConstituencies, setErrorConstituencies] = useState<string | null>(null);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [errorCategories, setErrorCategories] = useState<string | null>(null);
    const [discussionCategories, setDiscussionCategories] = useState<{ _id: string; name: string; createdAt: string; __v: number }[]>([]);


    const backendUrl = process.env.NEXT_PUBLIC_API_URL;

    // Discussion categories (can be fetched from API later if needed)

    useEffect(() => {
        const fetchConstituencyAreaList = async () => {
            setLoadingConstituencies(true);
            try {
                const response = await fetch(`${backendUrl}/api/constituencies`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: ConstituencyListType[] = await response.json();
                setConstituencyAreaList(data);
            } catch (err) {
                console.error('Failed to fetch constituencies:', err);
                setErrorConstituencies('निर्वाचन क्षेत्रों को लोड करने में विफल');
            } finally {
                setLoadingConstituencies(false);
            }
        };
        const fetchDiscussionCategories = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/categories`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: { data: { categories: { _id: string; name: string, createdAt: string, __v: number }[] } } = await response.json();
                console.log("discussion categories data", data);
                setDiscussionCategories(data?.data?.categories);
            }
            catch (err) {
                console.error('Failed to fetch categories:', err);
                setErrorCategories('चर्चा श्रेणियों को लोड करने में विफल');
            }
            finally{
                setLoadingCategories(false);
            }
        
        };
        fetchConstituencyAreaList();
        fetchDiscussionCategories();
    }, [backendUrl]);

    const handleClose = () => {
        router.push('/message'); // Navigate back to the message page
    };

    const handleCancel = () => {
        // Optionally clear form fields
        setSelectedConstituency(null);
        setSelectedCategory(null);
        setPostContent('');
        setTags('');
        handleClose(); // Go back to message page
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate required fields
        if (!selectedConstituency || !selectedCategory || !postContent.trim()) {
            alert('कृपया सभी आवश्यक फ़ील्ड भरें');
            return;
        }

        try {
            const postData = {
                category: selectedCategory.value,
                content: postContent.trim(),
                author: "68a733a6ea0064119890ac1d", // Hardcoded user ID
                constituency: selectedConstituency._id,
                tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
                link: "https://example.com/article" // You can make this dynamic if needed
            };

            console.log('Submitting post:', postData);

            const response = await fetch(`${backendUrl}/api/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Post created successfully:', result);
            
            // Show success message or navigate away
            alert('चर्चा सफलतापूर्वक शुरू की गई!');
            handleClose(); // Navigate back to message page
            
        } catch (error: any) {
            console.error('Failed to create post:', error);
            alert(`चर्चा शुरू करने में विफल: ${error.message}`);
        }
    };

    const customSelectStyles = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: '#f3f4f6', // Light gray background for input
            border: '1px solid #d1d5db', // Light border
            borderRadius: '0.375rem', // Rounded corners
            padding: '0.25rem', // Padding inside
            minHeight: '44px', // Standard height
            boxShadow: 'none', // No shadow
            '&:hover': {
                borderColor: '#9ca3af', // Darker border on hover
            },
        }),
        placeholder: (provided: any) => ({
            ...provided,
            color: '#6b7280', // Gray placeholder text
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: '#1f2937', // Darker text for selected value
        }),
        option: (provided: any, state: { isSelected: boolean; isFocused: boolean }) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#273F4F' : state.isFocused ? '#e5e7eb' : 'white',
            color: state.isSelected ? 'white' : '#1f2937',
            '&:active': {
                backgroundColor: '#273F4F',
            },
        }),
        menu: (provided: any) => ({
            ...provided,
            zIndex: 100, // Ensure dropdown menu appears above other content
        }),
    };


    return (
        <div className="min-h-[90vh] bg-[#F6F6F6] flex flex-col items-center py-6 px-4">
            <button onClick={handleClose} className="absolute top-20 right-1 text-gray-400 hover:text-gray-700 z-10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            {/* Main Form Card */}
            <div className="rounded-lg w-full relative">
                {/* Close Button */}


                {/* Post Type Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1 mb-6 w-full w-full mx-auto gap-2 ">
                    <button
                        className={`flex-1 py-1 px-1 rounded-md max-w-[70px] text-sm font-medium ${postType === 'text' ? 'bg-[#273F4F] text-white' : 'text-gray-700 bg-white'}`}
                        onClick={() => setPostType('text')}
                    >
                        A टेक्स्ट
                    </button>
                    <button
                        className={`flex-1 py-1 px-1 rounded-md max-w-[70px] text-sm font-medium ${postType === 'poll' ? 'bg-[#273F4F] text-white' : 'text-gray-700 bg-white'}`}
                        onClick={() => setPostType('poll')}
                    >
                        <span className="inline-block mr-1">📊</span> पोल
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Constituency Dropdown */}
                    <div>
                        <label htmlFor="constituency-select" className="block text-sm font-medium text-[#273F4F] mb-1">
                            विधानसभा क्षेत्र
                        </label>
                        {loadingConstituencies ? (
                            <div className="text-center text-gray-500">Loading constituencies...</div>
                        ) : errorConstituencies ? (
                            <div className="text-center text-red-500">{errorConstituencies}</div>
                        ) : (
                            <Select
                                id="constituency-select"
                                options={constituencyAreaList.map(c => ({ value: c._id, label: c.area_name }))}
                                value={selectedConstituency ? { value: selectedConstituency._id, label: selectedConstituency.area_name } : null}
                                onChange={(option) => {
                                    if (option) {
                                        setSelectedConstituency({ _id: option.value, area_name: option.label });
                                    } else {
                                        setSelectedConstituency(null);
                                    }
                                }}
                                placeholder="अपना निर्वाचन क्षेत्र चुनें"
                                isClearable={true}
                                styles={customSelectStyles}
                                instanceId="constituency-select-instance"
                            />
                        )}
                    </div>

                    {/* Discussion Category Dropdown */}
                    <div>
                        <label htmlFor="category-select" className="block text-sm font-medium text-[#273F4F] mb-1">
                            चर्चा श्रेणी
                        </label>
                        <Select
                            id="category-select"
                            options={discussionCategories.map(c => ({ 
                                value: c._id, 
                                label: c.name
                            }))}
                            value={selectedCategory}
                            onChange={(option) => setSelectedCategory(option)}
                            placeholder="एक श्रेणी चुनें"
                            isClearable={true}
                            styles={customSelectStyles}
                            instanceId="category-select-instance"
                        />
                    </div>

                    {/* Discussion Text Area */}
                    <div>
                        <label htmlFor="discussion-text" className="block text-sm font-medium text-[#273F4F] mb-1">
                            चर्चा का टेक्स्ट
                        </label>
                        <textarea
                            id="discussion-text"
                            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-[#273F4F] focus:border-[#273F4F] text-gray-800 text-sm"
                            rows={4}
                            placeholder="अपनी बात साझा करें ..."
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Tags Input (Optional) */}
                    <div>
                        <label htmlFor="tags-input" className="block text-sm font-medium text-[#273F4F] mb-1">
                            टैग्स (वैकल्पिक)
                        </label>
                        <input
                            type="text"
                            id="tags-input"
                            className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-[#273F4F] focus:border-[#273F4F] text-gray-800 text-sm"
                            placeholder="टैग्स को कॉमा से अलग करें"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">उदाहरण: शिक्षा, स्वास्थ्य, रोजगार</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 border border-gray-300 rounded-md text-[#273F4F] font-medium bg-white hover:bg-gray-50 transition-colors"
                        >
                            रद्द करें
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#273F4F] text-white rounded-md font-medium hover:bg-[#1e2f3a] transition-colors"
                        >
                            चर्चा शुरू करें
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPostPage;