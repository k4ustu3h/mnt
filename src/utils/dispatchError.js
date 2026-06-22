export default function dispatchError(baseMsg, errorObj = null) {
	const errMessage =
		errorObj instanceof Error ? errorObj.message : String(errorObj || "");
	const fullMessage = errMessage ? `${baseMsg} ${errMessage}` : baseMsg;

	window.dispatchEvent(new CustomEvent("MNTerror", { detail: fullMessage }));
}
