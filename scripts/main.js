// Main JavaScript file for Oracle SQL Complete Guide

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to current navigation item
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Add copy functionality to code blocks
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.className = 'copy-btn';
        
        // Make code block container relative
        block.style.position = 'relative';
        block.appendChild(copyButton);
        
        // Copy functionality
        copyButton.addEventListener('click', async () => {
            const code = block.textContent.replace('Copy', '').trim();
            
            try {
                await navigator.clipboard.writeText(code);
                copyButton.textContent = 'Copied!';
                copyButton.style.background = '#10b981';
                
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                    copyButton.style.background = '#f59e0b';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code: ', err);
                copyButton.textContent = 'Failed';
                copyButton.style.background = '#ef4444';
                
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                    copyButton.style.background = '#f59e0b';
                }, 2000);
            }
        });
    });

    // Add scroll-to-top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll-to-top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Chapter progress tracking
    function updateProgress() {
        const sections = document.querySelectorAll('.content-section');
        const progress = document.createElement('div');
        progress.className = 'reading-progress';
        progress.style.cssText = `
            position: fixed;
            top: 80px;
            left: 0;
            width: 0%;
            height: 3px;
            background: #f59e0b;
            z-index: 999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progress);

        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progressWidth = (scrolled / documentHeight) * 100;
            
            progress.style.width = Math.min(progressWidth, 100) + '%';
        });
    }

    // Initialize progress bar if on chapter page
    if (document.querySelector('.content-section')) {
        updateProgress();
    }

    // Search functionality
    function addSearchFunctionality() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1001;
            display: none;
        `;

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search in chapter...';
        searchInput.className = 'search-input';
        searchInput.style.cssText = `
            padding: 8px 12px;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            background: white;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            width: 250px;
        `;

        const searchResults = document.createElement('div');
        searchResults.className = 'search-results';
        searchResults.style.cssText = `
            background: white;
            border: 1px solid #d1d5db;
            border-top: none;
            border-radius: 0 0 4px 4px;
            max-height: 200px;
            overflow-y: auto;
            display: none;
        `;

        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchResults);
        document.body.appendChild(searchContainer);
        
        // Toggle search with Ctrl+F
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                searchContainer.style.display = searchContainer.style.display === 'none' ? 'block' : 'none';
                if (searchContainer.style.display === 'block') {
                    searchInput.focus();
                }
            }
            
            if (e.key === 'Escape') {
                searchContainer.style.display = 'none';
                clearHighlights();
            }
        });
        
        // Search functionality
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            clearHighlights();
            searchResults.innerHTML = '';
            
            if (query.length > 2) {
                const results = searchInContent(query);
                displaySearchResults(results, searchResults);
                highlightText(query);
            }
            
            searchResults.style.display = query.length > 2 ? 'block' : 'none';
        });
    }
    
    function searchInContent(query) {
        const sections = document.querySelectorAll('.content-section');
        const results = [];
        
        sections.forEach((section, index) => {
            const title = section.querySelector('h2')?.textContent || '';
            const content = section.textContent.toLowerCase();
            
            if (content.includes(query)) {
                results.push({
                    title: title,
                    section: section,
                    index: index
                });
            }
        });
        
        return results;
    }
    
    function displaySearchResults(results, container) {
        if (results.length === 0) {
            container.innerHTML = '<div style="padding: 10px; color: #6b7280;">No results found</div>';
            return;
        }
        
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.style.cssText = `
                padding: 10px;
                border-bottom: 1px solid #e5e7eb;
                cursor: pointer;
                transition: background 0.2s ease;
            `;
            resultItem.textContent = result.title;
            
            resultItem.addEventListener('mouseenter', () => {
                resultItem.style.background = '#f3f4f6';
            });
            
            resultItem.addEventListener('mouseleave', () => {
                resultItem.style.background = 'white';
            });
            
            resultItem.addEventListener('click', () => {
                result.section.scrollIntoView({ behavior: 'smooth' });
                container.parentElement.style.display = 'none';
            });
            
            container.appendChild(resultItem);
        });
    }
    
    function highlightText(query) {
        const walker = document.createTreeWalker(
            document.querySelector('.page-content'),
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        
        while (node = walker.nextNode()) {
            if (node.parentElement.tagName !== 'SCRIPT' && 
                node.parentElement.tagName !== 'STYLE') {
                textNodes.push(node);
            }
        }
        
        textNodes.forEach(textNode => {
            const text = textNode.textContent;
            const regex = new RegExp(`(${query})`, 'gi');
            
            if (regex.test(text)) {
                const highlightedText = text.replace(regex, '<mark style="background: #fef3c7; padding: 2px 4px; border-radius: 2px;">$1</mark>');
                const span = document.createElement('span');
                span.innerHTML = highlightedText;
                textNode.parentNode.replaceChild(span, textNode);
            }
        });
    }
    
    function clearHighlights() {
        const marks = document.querySelectorAll('mark');
        marks.forEach(mark => {
            const parent = mark.parentNode;
            parent.replaceChild(document.createTextNode(mark.textContent), mark);
            parent.normalize();
        });
    }
    
    // Initialize search functionality if on chapter page
    if (document.querySelector('.content-section')) {
        addSearchFunctionality();
    }

    // Table of contents generator for long chapters
    function generateTOC() {
        const headings = document.querySelectorAll('.content-section h2, .content-section h3');
        if (headings.length < 3) return; // Only generate TOC for longer chapters
        
        const toc = document.createElement('div');
        toc.className = 'table-of-contents';
        toc.style.cssText = `
            position: fixed;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 1rem;
            max-width: 250px;
            max-height: 400px;
            overflow-y: auto;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 999;
            display: none;
        `;
        
        const tocTitle = document.createElement('h4');
        tocTitle.textContent = 'Table of Contents';
        tocTitle.style.cssText = 'margin-bottom: 0.5rem; color: #1e3a8a; font-size: 0.9rem;';
        toc.appendChild(tocTitle);
        
        const tocList = document.createElement('ul');
        tocList.style.cssText = 'list-style: none; padding: 0; margin: 0;';
        
        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${id}`;
            link.textContent = heading.textContent;
            link.style.cssText = `
                display: block;
                padding: 0.25rem 0;
                color: #374151;
                text-decoration: none;
                font-size: 0.8rem;
                transition: color 0.2s ease;
                ${heading.tagName === 'H3' ? 'padding-left: 1rem;' : ''}
            `;
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth' });
            });
            
            link.addEventListener('mouseenter', () => {
                link.style.color = '#f59e0b';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.color = '#374151';
            });
            
            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });
        
        toc.appendChild(tocList);
        
        // Toggle button
        const tocToggle = document.createElement('button');
        tocToggle.innerHTML = '📋';
        tocToggle.style.cssText = `
            position: fixed;
            left: 20px;
            top: 200px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #1e3a8a;
            color: white;
            border: none;
            cursor: pointer;
            z-index: 1000;
            font-size: 16px;
        `;
        
        tocToggle.addEventListener('click', () => {
            toc.style.display = toc.style.display === 'none' ? 'block' : 'none';
        });
        
        document.body.appendChild(toc);
        document.body.appendChild(tocToggle);
    }
    
    // Generate TOC if on chapter page
    if (document.querySelector('.content-section')) {
        generateTOC();
    }

    console.log('Oracle SQL Complete Guide loaded successfully!');
});