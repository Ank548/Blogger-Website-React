import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'

function RTE({ name, control, defaultValue = "", label }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='ljyonpe130jyolax4vgwq0ikzwavv586a5safjd3z5hemxbm'
                        initialValue={defaultValue}
                        onEditorChange={onChange}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | bold italic forecolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat',
                            // Add paste_webkit_styles option to preserve styles on paste
                            paste_webkit_styles: 'padding list-style-type outline text-decoration overflow-wrap color font-family font-size font-style font-variant-ligatures font-variant-caps font-weight letter-spacing orphans text-align text-indent text-transform widows word-spacing -webkit-text-stroke-width white-space',
                            // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            resize: false
                        }}
                    />
                )}
            />
        </div>
    )
}

export default RTE
