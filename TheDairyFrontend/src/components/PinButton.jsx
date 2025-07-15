import { PushPin } from '@mui/icons-material';

export default function PinButton({ pinned, editable = false, onToggle }) {
    return (
        (pinned || editable) && (
            <PushPin
                onClick={editable ? onToggle : undefined}
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    cursor: editable ? 'pointer' : 'default',
                    transition: 'transform 0.2s, color 0.2s',
                    transform: editable
                        ? (pinned ? 'rotate(45deg)' : 'rotate(90deg)')
                        : 'rotate(45deg)',
                    color: editable
                        ? (pinned ? 'primary.main' : 'black')
                        : 'primary.main',
                }}
            />
        )
    );
}
