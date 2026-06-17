// nopic.js - 阻止所有图片加载，页面极速渲染
(function() {
  'use strict';

  // 1. 在DOM构建前拦截所有图片请求
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;
    if (url && /\.(jpg|jpeg|png|gif|webp|bmp|svg|avif|ico)(\?.*)?$/i.test(url)) {
      return Promise.resolve(new Response('', { status: 200, headers: { 'content-type': 'image/webp' } }));
    }
    return originalFetch.apply(this, args);
  };

  // 2. 拦截 XMLHttpRequest
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    if (typeof url === 'string' && /\.(jpg|jpeg|png|gif|webp|bmp|svg|avif|ico)(\?.*)?$/i.test(url)) {
      this._isImageBlocked = true;
    }
    return originalOpen.call(this, method, url, ...rest);
  };
  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function(...args) {
    if (this._isImageBlocked) {
      setTimeout(() => {
        this.readyState = 4;
        this.status = 200;
        this.response = '';
        if (this.onreadystatechange) this.onreadystatechange();
        if (this.onload) this.onload();
      }, 0);
      return;
    }
    return originalSend.apply(this, args);
  };

  // 3. 拦截创建 Image 对象
  const ImageProto = HTMLImageElement.prototype;
  const desc = Object.getOwnPropertyDescriptor(ImageProto, 'src');
  Object.defineProperty(ImageProto, 'src', {
    set: function(val) {
      if (desc) desc.set.call(this, 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    },
    get: function() { return ''; },
    configurable: true
  });

  // 4. MutationObserver 移除已存在的和动态插入的图片
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeName === 'IMG') {
          node.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
          node.style.display = 'none';
        }
        if (node.querySelectorAll) {
          node.querySelectorAll('img').forEach(img => {
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            img.style.display = 'none';
          });
        }
      }
    }
  });

  // 5. 立即处理现有图片并启动观察
  const cleanup = () => {
    document.querySelectorAll('img, picture, figure, [role="img"]').forEach(el => {
      if (el.tagName === 'IMG') {
        el.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        el.removeAttribute('srcset');
      }
      el.style.display = 'none';
    });
    document.querySelectorAll('video, source[type^="image"]').forEach(el => el.remove());
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.documentElement, { childList: true, subtree: true });
      cleanup();
    });
  } else {
    observer.observe(document.documentElement, { childList: true, subtree: true });
    cleanup();
  }

  // 6. CSS 层面隐藏图片（防止闪烁）
  const style = document.createElement('style');
  style.textContent = `
    img, picture, figure, [role="img"], video, canvas, svg, embed[type^="image"] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      width: 0 !important;
      height: 0 !important;
      min-width: 0 !important;
      min-height: 0 !important;
    }
    * { background-image: none !important; }
  `;
  (document.head || document.documentElement).appendChild(style);
})();