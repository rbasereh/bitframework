﻿class BitDatePicker {
    static toggleDatePickerCallout(dotnetObjReference: any,
        datePickerId: string,
        datePickerCalloutId: string,
        datePickerOverlayId: string,
        isOpen: boolean) {
        const datePicker = document.getElementById(datePickerId) ?? new HTMLElement();
        const datePickerCallout = document.getElementById(datePickerCalloutId) ?? new HTMLElement();
        const datePickerOverlay = document.getElementById(datePickerOverlayId) ?? new HTMLElement();

        if (isOpen) {
            datePickerCallout.style.display = "none";
            datePickerOverlay.style.display = "none";
            Bit.currentCallout.update("", "", null);
        } else {
            Bit.closeCurrentCalloutIfExists(datePickerCalloutId, datePickerOverlayId, dotnetObjReference);
            datePickerCallout.style.display = "block";
            datePickerOverlay.style.display = "block";
            var datePickerCalloutHeight = datePickerCallout.offsetHeight;
            var datePickerCalloutWidth = datePickerCallout.offsetWidth;
            var datePickerHeight = datePicker.offsetHeight;
            var datePickerWidth = datePicker.offsetWidth;
            var datePickerX = datePicker.getBoundingClientRect().x;
            var datePickerY = datePicker.getBoundingClientRect().y;
            var datePickerTop = datePicker.getBoundingClientRect().y;
            var datePickerWrapperBottom = window.innerHeight - (datePickerHeight + datePickerY);
            var datePickerWrapperRight = window.innerWidth - (datePickerWidth + datePickerX);

            if (datePickerWrapperBottom >= datePickerCalloutHeight) {
                datePickerCallout.style.top = datePickerY + datePickerHeight + 1 + "px";
                datePickerCallout.style.left = datePickerX + "px";
                datePickerCallout.style.right = "unset";
                datePickerCallout.style.bottom = "unset";
            } else if (datePickerTop >= datePickerCalloutHeight) {
                datePickerCallout.style.bottom = datePickerWrapperBottom + datePickerHeight + 1 + "px";;
                datePickerCallout.style.left = datePickerX + "px";
                datePickerCallout.style.right = "unset";
                datePickerCallout.style.top = "unset";
            } else if (datePickerWrapperRight >= datePickerCalloutWidth) {
                datePickerCallout.style.left = datePickerX + datePickerWidth + 1 + "px";
                datePickerCallout.style.bottom = "2px";
                datePickerCallout.style.right = "unset";
                datePickerCallout.style.top = "unset";
            } else {
                datePickerCallout.style.left = datePickerX - datePickerCalloutWidth - 1 + "px";
                datePickerCallout.style.bottom = "2px";
                datePickerCallout.style.right = "unset";
                datePickerCallout.style.top = "unset"
            }
        }
    }
}