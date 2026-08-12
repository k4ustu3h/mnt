import SiBlogger from "@icons-pack/react-simple-icons/icons/SiBlogger";
import SiChromewebstore from "@icons-pack/react-simple-icons/icons/SiChromewebstore";
import SiGmail from "@icons-pack/react-simple-icons/icons/SiGmail";
import SiGoogle from "@icons-pack/react-simple-icons/icons/SiGoogle";
import SiGoogleads from "@icons-pack/react-simple-icons/icons/SiGoogleads";
import SiGoogleanalytics from "@icons-pack/react-simple-icons/icons/SiGoogleanalytics";
import SiGooglecalendar from "@icons-pack/react-simple-icons/icons/SiGooglecalendar";
import SiGooglechat from "@icons-pack/react-simple-icons/icons/SiGooglechat";
import SiGoogleclassroom from "@icons-pack/react-simple-icons/icons/SiGoogleclassroom";
import SiGoogledocs from "@icons-pack/react-simple-icons/icons/SiGoogledocs";
import SiGoogledrive from "@icons-pack/react-simple-icons/icons/SiGoogledrive";
import SiGoogleearth from "@icons-pack/react-simple-icons/icons/SiGoogleearth";
import SiGoogleforms from "@icons-pack/react-simple-icons/icons/SiGoogleforms";
import SiGooglegemini from "@icons-pack/react-simple-icons/icons/SiGooglegemini";
import SiGooglekeep from "@icons-pack/react-simple-icons/icons/SiGooglekeep";
import SiGooglemaps from "@icons-pack/react-simple-icons/icons/SiGooglemaps";
import SiGooglemeet from "@icons-pack/react-simple-icons/icons/SiGooglemeet";
import SiGooglenews from "@icons-pack/react-simple-icons/icons/SiGooglenews";
import SiGooglephotos from "@icons-pack/react-simple-icons/icons/SiGooglephotos";
import SiGoogleplay from "@icons-pack/react-simple-icons/icons/SiGoogleplay";
import SiGooglesheets from "@icons-pack/react-simple-icons/icons/SiGooglesheets";
import SiGoogleslides from "@icons-pack/react-simple-icons/icons/SiGoogleslides";
import SiGoogletranslate from "@icons-pack/react-simple-icons/icons/SiGoogletranslate";
import SiNotebooklm from "@icons-pack/react-simple-icons/icons/SiNotebooklm";
import SiYoutube from "@icons-pack/react-simple-icons/icons/SiYoutube";
import SiYoutubemusic from "@icons-pack/react-simple-icons/icons/SiYoutubemusic";

import {
	AccountCircle,
	Bookmark,
	ContactsProduct,
	Task,
	VpnKey,
	Wallet,
} from "@nine-thirty-five/material-symbols-react/rounded";

export const apps = [
	{
		name: "Account",
		url: "https://myaccount.google.com",
		icon: <AccountCircle size={24} />,
	},
	{
		name: "Search",
		url: "https://google.com",
		icon: <SiGoogle />,
	},
	{
		name: "Maps",
		url: "https://maps.google.com",
		icon: <SiGooglemaps />,
	},
	{
		name: "YouTube",
		url: "https://youtube.com",
		icon: <SiYoutube />,
	},
	{
		name: "Play",
		url: "https://play.google.com",
		icon: <SiGoogleplay />,
	},
	{
		name: "Gmail",
		url: "https://mail.google.com",
		icon: <SiGmail />,
	},
	{
		name: "Drive",
		url: "https://drive.google.com",
		icon: <SiGoogledrive />,
	},
	{
		name: "Calendar",
		url: "https://calendar.google.com",
		icon: <SiGooglecalendar />,
	},
	{
		name: "Gemini",
		url: "https://gemini.google.com",
		icon: <SiGooglegemini />,
	},
	{
		name: "News",
		url: "https://news.google.com",
		icon: <SiGooglenews />,
	},
	{
		name: "Photos",
		url: "https://photos.google.com",
		icon: <SiGooglephotos />,
	},
	{
		name: "Meet",
		url: "https://meet.google.com",
		icon: <SiGooglemeet />,
	},
	{
		name: "Translate",
		url: "https://translate.google.com",
		icon: <SiGoogletranslate />,
	},
	{
		name: "Sheets",
		url: "https://docs.google.com/spreadsheets",
		icon: <SiGooglesheets />,
	},
	{
		name: "Docs",
		url: "https://docs.google.com/document",
		icon: <SiGoogledocs />,
	},
	{
		name: "Slides",
		url: "https://docs.google.com/presentation",
		icon: <SiGoogleslides />,
	},
	{
		name: "Keep",
		url: "https://keep.google.com",
		icon: <SiGooglekeep />,
	},
	{
		name: "Classroom",
		url: "https://classroom.google.com",
		icon: <SiGoogleclassroom />,
	},
	{
		name: "Chat",
		url: "https://chat.google.com",
		icon: <SiGooglechat />,
	},
	{
		name: "Earth",
		url: "https://earth.google.com",
		icon: <SiGoogleearth />,
	},
	{
		name: "Saved",
		url: "https://www.google.com/save",
		icon: <Bookmark size={24} />,
	},
	{
		name: "Google Ads",
		url: "https://ads.google.com",
		icon: <SiGoogleads />,
	},
	{
		name: "Contacts",
		url: "https://contacts.google.com",
		icon: <ContactsProduct size={24} />,
	},
	{
		name: "Forms",
		url: "https://docs.google.com/forms",
		icon: <SiGoogleforms />,
	},
	{
		name: "Chrome Web Store",
		url: "https://chrome.google.com/webstore",
		icon: <SiChromewebstore />,
	},
	{
		name: "Password Manager",
		url: "https://passwords.google.com",
		icon: <VpnKey size={24} />,
	},
	{
		name: "Google Analytics",
		url: "https://analytics.google.com",
		icon: <SiGoogleanalytics />,
	},
	{
		name: "Blogger",
		url: "https://www.blogger.com",
		icon: <SiBlogger />,
	},
	{
		name: "YouTube Music",
		url: "https://music.youtube.com",
		icon: <SiYoutubemusic />,
	},
	{
		name: "Wallet",
		url: "https://wallet.google.com",
		icon: <Wallet size={24} />,
	},
	{
		name: "Gemini Notebook",
		url: "https://notebook.google.com/",
		icon: <SiNotebooklm />,
	},
	{
		name: "Tasks",
		url: "https://tasksboard.com",
		icon: <Task size={24} />,
	},
];
