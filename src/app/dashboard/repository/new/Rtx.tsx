import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import react-quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

// Define the props interface
interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const RichTextEditor: FC<RichTextEditorProps> = ({ value, onChange }) => {
    return (
        <>
            <ReactQuill
                className="react-quill-editor rounded-lg overflow-hidden  h-auto bg-white "  // Apply Tailwind classes for height

                value={value}
                onChange={onChange}
                modules={{
                    toolbar: [
                        [{ 'header': [1, 2, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                        ['link', 'image'],
                        ['clean'],
                        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }]
                    ],
                }}
                formats={[
                    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'align'
                ]}
            />
            <style jsx global>{`
        .react-quill-editor .ql-container {
          border: none; /* Remove default border */
        }
        .react-quill-editor .ql-editor {
          border: none; /* Remove border inside the editor */
          min-height: 200px; /* Set a minimum height */
        }
        .react-quill-editor .ql-toolbar {
          border: none; /* Remove border inside the editor */
          border-bottom: 1px solid black;

        }
      `}</style>

        </>
    );
};

export default RichTextEditor;
