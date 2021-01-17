import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

export const menu = [
    {
        key: "menu_notes",
        label: "Notes",
        link: "/",
        icon: () => <EmojiObjectsOutlinedIcon />
    },
    {
        key: "menu_archive",
        label: "Archived",
        link: "/archived",
        icon: () => <ArchiveOutlinedIcon />
    },
    {
        key: "menu_trash",
        label: "Trash",
        link: "/trash",
        icon: () => <DeleteOutlineOutlinedIcon />
    }
]