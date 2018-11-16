// Libraries
import React from 'react';

class GeneralHelper {

    concatHtml(items) {
        return `<span>${items.join("</span><span>")}</span>`;
    }

    joinHtml(items, seperator = "") {
        return items.reduce((result, item) => {
            return (
                <>
                    {result}
                    <span>{seperator}</span>
                    {item}
                </>
            )
        });
    }

}

export default new GeneralHelper();