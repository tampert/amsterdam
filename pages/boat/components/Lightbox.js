// Libraries
import React, { Component } from 'react';
import Lightbox from 'react-images';
import NOSSR from 'react-no-ssr';

export default class LightBox extends Component {

    render() {
        let { images, open, onClose, index, onChange } = this.props;
        return (
            <NOSSR>
                <Lightbox
                    backdropClosesModal={true}
                    currentImage={index}
                    showThumbnails={true}
                    images={images}
                    isOpen={open}
                    onClose={onClose}
                    onClickThumbnail={(index) => { onChange(index); }}
                    onClickNext={() => { onChange(index + 1); }}
                    onClickPrev={() => { onChange(index - 1); }}
                />
            </NOSSR>
        )
    }

}