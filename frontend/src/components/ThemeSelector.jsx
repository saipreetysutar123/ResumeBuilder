// import React, { useRef, useState } from 'react'
// import { DUMMY_RESUME_DATA, resumeTemplates } from '../utils/data'
// import Tabs from './Tabs';
// import { Check } from 'lucide-react';
// import { TemplateCard } from './Cards';
// import RenderResume from './RenderResume';

// const TAB_DATA = [{ label: 'Templates' }]

// const ThemeSelector = ({  resumeData, onClose }) => {

//     const resumeRef = useRef(null);
//     const [baseWidth, setBaseWidth] = useState(800);

//     // Selected theme template using id
//     const initialIndex = resumeTemplates.findIndex(t => t.id === selectedTheme)
//     const [selectedTheme, setSelectedTheme] = useState({
//         theme: selectedTheme || resumeTemplates[0]?.id || "",
//         index: initialIndex >= 0 ? initialIndex : 0
//     })

//     const [tabValue, setTabValue] = useState('Templates')

//     const handleThemeSelection = () => {
//         setSelectedTheme(selectedTheme.theme)
//         onClose();
//     }

//     const updateBaseWidth = () => {
//         if (resumeRef.current) {
//             setBaseWidth(resumeRef.current.offsetWidth)
//         }
//     }

//     useEffect(() => {
//         updateBaseWidth()
//         window.addEventListener("resize", updateBaseWidth)
//         return () => {
//             window.removeEventListener("resize", updateBaseWidth)
//         }
//     }, [])

//     return (
//         <div className=' max-w-7xl mx-auto p-4'>
//             {/* header */}
//             <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8
//             p-4 sm:p-6 bg-gradient-to-r from-white to-violet-50 rounded-2xl border border-violet-100'>

//                 <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />

//                 <button className='w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r
//                 from-violet-600 to-fuchsia-600 text-white font-black rounded-2xl hover:scale-105
//                 transition-all shadow-lg hover:shadow-xl' onClick={handleThemeSelection}>
//                     <Check size={18} /> Apply Changes
//                 </button>
//             </div>

//             <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8'>
//                 <div className='lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-4 sm:p-6'>
//                     <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] lg:max-h-[70vh]
//                     overflow-auto p-2'>
//                         {resumeTemplates.map((template, index) => (
//                             <TemplateCard key={`templates_${index}`}
//                                 thumbnailImg={template.thumbnailImg}
//                                 isSelected={selectedTheme.index === index}
//                                 onSelect={() => setSelectedTheme({
//                                     theme: template.id,
//                                     index
//                                 })}
//                             />
//                         ))}
//                     </div>
//                 </div>

//                 {/* RIGHT AREA */}
//                 <div className=' lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-4 sm:p-6' ref={resumeRef}>
//                     <RenderResume templateId={selectedTheme?.theme || ""}
//                         resumeData={resumeData || DUMMY_RESUME_DATA}
//                         containerWidth={baseWidth}
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ThemeSelector

import React, { useRef, useState, useEffect } from 'react'
import { DUMMY_RESUME_DATA, resumeTemplates } from '../utils/data'
import Tabs from './Tabs'
import { Check } from 'lucide-react'
import { TemplateCard } from './Cards'
import RenderResume from './RenderResume'

const TAB_DATA = [{ label: 'Templates' }]

const ThemeSelector = ({ resumeData, onClose }) => {
    const resumeRef = useRef(null)
    const [baseWidth, setBaseWidth] = useState(800)

    // Initialize the selected theme properly
    const [selectedTheme, setSelectedTheme] = useState({
        theme: resumeTemplates[0]?.id || "",
        index: 0
    })

    const [tabValue, setTabValue] = useState('Templates')

    const handleThemeSelection = () => {
        onClose(selectedTheme.theme)
    }

    const updateBaseWidth = () => {
        if (resumeRef.current) {
            setBaseWidth(resumeRef.current.offsetWidth)
        }
    }

    useEffect(() => {
        updateBaseWidth()
        window.addEventListener("resize", updateBaseWidth)
        return () => {
            window.removeEventListener("resize", updateBaseWidth)
        }
    }, [])

    return (
        <div className='max-w-7xl mx-auto p-4'>
            {/* HEADER */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 sm:p-6 bg-gradient-to-r from-white to-violet-50 rounded-2xl border border-violet-100'>
                <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={setTabValue} />
                <button
                    className='w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black rounded-2xl hover:scale-105 transition-all shadow-lg hover:shadow-xl'
                    onClick={handleThemeSelection}
                >
                    <Check size={18} /> Apply Changes
                </button>
            </div>

            {/* MAIN CONTENT */}
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8'>
                {/* LEFT SIDE - Template Thumbnails */}
                <div className='lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-4 sm:p-6'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] lg:max-h-[70vh] overflow-auto p-2'>
                        {resumeTemplates.map((template, index) => (
                            <TemplateCard
                                key={`templates_${index}`}
                                thumbnailImg={template.thumbnailImg}
                                isSelected={selectedTheme.index === index}
                                onSelect={() =>
                                    setSelectedTheme({
                                        theme: template.id,
                                        index
                                    })
                                }
                            />
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE - Preview */}
                <div
                    className='lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-4 sm:p-6'
                    ref={resumeRef}
                >
                    <RenderResume
                        templateId={selectedTheme?.theme || ""}
                        resumeData={resumeData || DUMMY_RESUME_DATA}
                        containerWidth={baseWidth}
                    />
                </div>
            </div>
        </div>
    )
}

export default ThemeSelector
