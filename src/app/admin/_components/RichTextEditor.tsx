'use client';

import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    List,
    ListOrdered,
    Quote,
    Heading2,
    Heading3,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link as LinkIcon,
    Image as ImageIcon,
    Undo,
    Redo,
    Eye,
    EyeOff
} from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    const setLink = () => {
        const url = window.prompt('Enter link URL:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = window.prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const ToolbarButton = ({
        onClick,
        isActive = false,
        disabled = false,
        children
    }: {
        onClick: () => void;
        isActive?: boolean;
        disabled?: boolean;
        children: React.ReactNode;
    }) => (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`p-2 rounded hover:bg-gray-100 transition-colors ${isActive ? 'bg-gray-200 text-titan-navy shadow-sm' : 'text-gray-600'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    );

    return (
        <div className="flex flex-wrap items-center gap-1 py-1">
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                disabled={!editor.can().chain().focus().toggleBold().run()}
            >
                <Bold size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
            >
                <Italic size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={editor.isActive('underline')}
                disabled={!editor.can().chain().focus().toggleUnderline().run()}
            >
                <UnderlineIcon size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={editor.isActive('strike')}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
            >
                <Strikethrough size={16} />
            </ToolbarButton>

            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editor.isActive('heading', { level: 2 })}
            >
                <Heading2 size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                isActive={editor.isActive('heading', { level: 3 })}
            >
                <Heading3 size={16} />
            </ToolbarButton>

            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                isActive={editor.isActive({ textAlign: 'left' })}
            >
                <AlignLeft size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                isActive={editor.isActive({ textAlign: 'center' })}
            >
                <AlignCenter size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                isActive={editor.isActive({ textAlign: 'right' })}
            >
                <AlignRight size={16} />
            </ToolbarButton>

            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
            >
                <List size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive('orderedList')}
            >
                <ListOrdered size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive('blockquote')}
            >
                <Quote size={16} />
            </ToolbarButton>

            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            <ToolbarButton onClick={setLink} isActive={editor.isActive('link')}>
                <LinkIcon size={16} />
            </ToolbarButton>
            <ToolbarButton onClick={addImage}>
                <ImageIcon size={16} />
            </ToolbarButton>

            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
            >
                <Undo size={16} />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
            >
                <Redo size={16} />
            </ToolbarButton>
        </div>
    );
};

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const [isPreview, setIsPreview] = useState(false);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-titan-red underline hover:text-red-700',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'max-w-full rounded-lg shadow-sm border border-gray-200 my-4',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class:
                    'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[250px] p-4 bg-white',
            },
        },
    });

    return (
        <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden focus-within:border-titan-navy focus-within:ring-1 focus-within:ring-titan-navy transition-all">
            <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-2 rounded-t-lg min-h-[50px]">
                <div className="flex-1 overflow-x-auto my-1">
                    {!isPreview && <MenuBar editor={editor} />}
                    {isPreview && <div className="py-2.5 px-2 text-sm font-bold text-titan-navy">Preview Mode</div>}
                </div>
                <div className="pl-2 py-1.5 flex-shrink-0 border-l border-gray-200 ml-2">
                    <button
                        type="button"
                        onClick={() => setIsPreview(!isPreview)}
                        className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded transition-colors ${isPreview ? 'bg-titan-navy text-white hover:bg-titan-navy/90' : 'text-gray-600 hover:text-titan-navy hover:bg-gray-100'
                            }`}
                    >
                        {isPreview ? <><EyeOff size={14} /> Edit</> : <><Eye size={14} /> Preview</>}
                    </button>
                </div>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
                {isPreview ? (
                    <div
                        className="prose prose-sm sm:prose-base max-w-none min-h-[250px] p-4 bg-white"
                        dangerouslySetInnerHTML={{ __html: value || '<p class="text-gray-400 italic">No content to preview</p>' }}
                    />
                ) : (
                    <EditorContent editor={editor} />
                )}
            </div>
            {/* Global styles for Tiptap editor since Tailwind typography can sometimes conflict or not be enough without plugins */}
            <style jsx global>{`
                .ProseMirror p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #9ca3af;
                    pointer-events: none;
                    height: 0;
                }
                .ProseMirror p {
                    margin-bottom: 1em;
                }
                .ProseMirror h2 {
                    font-size: 1.5em;
                    font-weight: 700;
                    margin-top: 1.5em;
                    margin-bottom: 0.5em;
                }
                .ProseMirror h3 {
                    font-size: 1.25em;
                    font-weight: 700;
                    margin-top: 1.25em;
                    margin-bottom: 0.5em;
                }
                .ProseMirror ul {
                    list-style-type: disc;
                    padding-left: 1.5em;
                    margin-bottom: 1em;
                }
                .ProseMirror ol {
                    list-style-type: decimal;
                    padding-left: 1.5em;
                    margin-bottom: 1em;
                }
                .ProseMirror blockquote {
                    border-left: 4px solid #e5e7eb;
                    padding-left: 1rem;
                    color: #4b5563;
                    font-style: italic;
                    margin: 1.5em 0;
                }
                .ProseMirror img.ProseMirror-selectednode {
                    outline: 2px solid #0f2042; /* titan-navy */
                }
            `}</style>
        </div>
    );
}
