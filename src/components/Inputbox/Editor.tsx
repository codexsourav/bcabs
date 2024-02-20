import { memo, useMemo, useRef } from 'react';
import JoditEditor from 'jodit-react';

export const Editor = memo(({ placeholder, label, onChenge, value }: { placeholder?: string, label?: string, value: string, onChenge: (e: string) => void }) => {
    const editor = useRef(null);
    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: placeholder || 'Start typings...',
            height: 400,
        }),
        []
    );


    return (
        <div className="mb-4">
            {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
            <JoditEditor
                ref={editor}
                value={value}
                config={config}
                onChange={onChenge}
            />
        </div>
    );
});