// 페이지 로드 시 현재 페이지에 맞는 탭 메뉴 활성화
document.addEventListener('DOMContentLoaded', function() {
    // 현재 페이지 파일명 가져오기
    const currentPage = window.location.pathname.split('/').pop();
    
    // 모든 탭 메뉴 링크 가져오기
    const tabItems = document.querySelectorAll('.tab-item');
    
    // 각 링크를 순회하며 현재 페이지와 일치하는 링크에 active 클래스 추가
    tabItems.forEach(item => {
        const linkPage = item.getAttribute('href');
        // index.html이거나 페이지명이 비어있을 때 '등록 및 수정' 탭 활성화
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            item.classList.add('active');
        }
    });
});

// 부드러운 스크롤 효과
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 헤더 높이를 고려한 스크롤 위치 조정
                const headerHeight = 120;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 목차(TOC) 현재 위치 하이라이트
document.addEventListener('DOMContentLoaded', function() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('section[id^="section-"], div.step[id^="section-"]');
    
    if (tocLinks.length === 0 || sections.length === 0) return;
    
    function highlightTOC() {
        let currentSection = '';
        const headerHeight = 120;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - headerHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightTOC);
    highlightTOC(); // 초기 실행
});

// 맨 위로 버튼 생성 및 기능
document.addEventListener('DOMContentLoaded', function() {
    // 버튼 생성
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '↑';
    scrollButton.setAttribute('aria-label', '맨 위로');
    document.body.appendChild(scrollButton);
    
    // 스크롤 이벤트 처리
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('show');
        } else {
            scrollButton.classList.remove('show');
        }
    });
    
    // 버튼 클릭 이벤트
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});




