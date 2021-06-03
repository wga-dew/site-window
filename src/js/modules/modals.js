const modals = (state) => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverelay = true) {

        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        let openedModal = modal.querySelector('div > div').children;
        let calcModalElements = openedModal[0].children;

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) e.preventDefault();

                calcModalElements.forEach(elem => {
                    if (elem.classList.contains('balcon_icons')) {
                        elem.children.forEach((item, i) => {
                            if (item.classList.contains('do_image_more')) {
                                state['form'] = i;
                            }
                        });
                    } else if (elem.id == 'width') {
                        if (elem.value.length >= 1) {
                            state['width'] = elem.value;
                        }

                    } else if (elem.id == 'height') {
                        if (elem.value.length >= 1) {
                            state['height'] = elem.value;
                        }
                    }
                });

                showModal();
            });
        });

        function closeModal() {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `${0}px`;
            // document.body.classList.remove('modal-open');
        }

        function showModal() {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
            // document.body.classList.add('modal-open');
        }

        close.addEventListener('click', () => {
            closeModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverelay) {
                closeModal();
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = 'hidden';
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.append(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    bindModal('.phone_link', '.popup', '.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime('.popup', 60 * 1000);

};

export default modals;