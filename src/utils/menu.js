import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
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
        key: "menu_reminders",
        label: "Reminders",
        link: "/reminders",
        icon: () => <NotificationsNoneOutlinedIcon />
    },
    {
        key: "menu_archive",
        label: "Archive",
        link: "/archive",
        icon: () => <ArchiveOutlinedIcon />
    },
    {
        key: "menu_trash",
        label: "Trash",
        link: "/trash",
        icon: () => <DeleteOutlineOutlinedIcon />
    }
]