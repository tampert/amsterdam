// Libraries
import React, { Component } from 'react';

export default class ModalSkeleton extends Component {

    scrollTop = 0;

    componentDidMount() {
        this.scrollTop = document.documentElement.scrollTop;
        document.body.classList.add("noscrolling");
        document.body.style.top = `-${this.scrollTop}px`;
        this.container.addEventListener("click", (e) => {
            if (!this.modal.contains(e.target)) {
                this.close();
            }
        });
        this.container.classList.add("animated");
        setTimeout(() => {
            this.modal.classList.add("animated");
        }, 50);
    }

    componentWillUnmount() {
        document.body.classList.remove("noscrolling");
        document.body.style.top = 0;
        window.scrollTo(0, this.scrollTop);
    }

    close() {
        this.container.classList.remove("animated");
        this.modal.classList.remove("animated");
        setTimeout(() => {
            this.props.onClose();
        }, 400);
    }

    render() {
        const { className } = this.props;
        return (
            <div className="modal-skeleton" ref={(container) => { this.container = container; }}>
                <div className={`modal-skeleton__container ${className}`} ref={(modal) => { this.modal = modal; }}>
                    {this.props.children}
                </div>
                <style jsx>{`
                    .modal-skeleton { backface-visibility: hidden; transition: background-color 400ms; overflow: auto; display: flex; flex-direction: row; justify-content: flex-start; align-items: center; z-index: 99; position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0); }
                    .modal-skeleton.animated { background-color: rgba(0,0,0,0.5); }
                    .modal-skeleton__container { backface-visibility: hidden; transition: all 400ms ease; transform: translateY(40%); opacity: 0; visibility: hidden; border-radius: 5px; margin: auto; width: 100%; max-width: 700px; background-color: #fff; position: relative; }
                    .modal-skeleton__container.animated { transform: translateY(0%); opacity: 1; visibility: visible; }
                    @media all and (max-width: 768px) {
                        .modal-skeleton__container { height: 100%; border-radius: 0; overflow: auto; }
                    }
                `}</style>
            </div>
        )
    }

}