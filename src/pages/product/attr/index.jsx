import React, { useEffect } from 'react';
import './index.scss';

const Attr = () => {
    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const edge = 72; //边数

        /**
         * 动态生成图片
         * @param {元素} el 
         * @param {起始位置} start 
         * @param {结束位置} end 
         */
        const swiper = (el, start, end) => {
            let index = start;

            for (let i = 0; i < edge; i++) {
                let div = document.createElement('div');
                div.style.transform = `rotateX(${(360 / edge) * i}deg) translateZ(3430px)`;
                div.style.background = `url(./image/${index}.jpeg) no-repeat`;
                div.style.backgroundSize = 'cover';
                el.appendChild(div);

                index++;

                if (index === end) {
                    index = start;
                }
            }
        };

        let start = 1; // 第一张图片下标
        let end = 4; // 第一组图片最后一张图片下标
        for (let j = 0; j < sections.length; j++) {
            swiper(sections[j], start, end);
            start = start + 3; // 一组图片3张
            end = end + 3;
        }
    }, []);

    return (
        <div id="container">
            <section></section>
            <section></section>
            <section></section>
        </div>
    );
};

export default Attr;









// import Category from "@/components/category"

// const Attr = () => {
//     const scene = 0
//     return (
//         <div>
//             <Category scene={scene} />
//         </div>
//     )
// }
// export default Attr


//解决useState异步更新的三种方式
// 1、使用useEffect 和 setTimeout。
// useEffect 是一个 React Hook，用于在组件渲染后运行某些代码。通过 setTimeout，你可以将代码推迟到下一个事件循环，这样可以确保在 DOM 更新完成后再执行。
// 2、useLayoutEffect：它会在所有 DOM 变更后同步调用，可以确保在浏览器完成绘制之前运行代码。适用于需要同步执行 DOM 操作的场景。
// 3、MutationObserver 是一个原生的 JavaScript API，用于监视 DOM 的变动。你可以用它来监听某个 DOM 元素的变动，并在变动发生后执行代码。

// 异步更新：

// setState 和 setPageNo 是异步的。React 可能会批量处理多个状态更新，而不是立即更新状态。这种异步更新是为了提高性能，减少不必要的渲染次数。

// 调度和批量处理：
// 当你调用 setState 时，React 会将状态更新请求添加到一个队列中，而不是立即更新状态。这些更新请求会在下一次渲染过程中被处理。React 会在合适的时机批量处理这些更新，以优化性能。

// 渲染和更新流程：
// 在 React 的渲染流程中，组件首先会收到新的状态值（在虚拟 DOM 中更新），然后进行重新渲染。在这个过程中，实际的 DOM 更新会发生在浏览器的绘制阶段之后。
// 这意味着，当你调用 setPageNo(pager) 后，实际的 pageNo 的值在下一个渲染周期中才会更新，因此如果你在调用 setPageNo(pager) 之后立刻读取 pageNo，你会得到旧的值。


// 事件循环的详细流程
// 执行栈：
// JavaScript 运行时会执行当前的同步代码。
// 微任务队列：
// 在当前执行栈中的代码执行完毕后，事件循环会立即检查微任务队列，处理所有排在微任务队列中的任务。这些任务会在任何宏任务之前执行。
// 渲染：
// 在微任务队列清空之后，浏览器会执行渲染任务，例如更新 DOM，以反映状态变化。
// 宏任务队列：
// 一旦微任务队列清空且渲染任务完成后，事件循环会处理宏任务队列中的任务。这些任务会在新的事件循环开始时执行。
