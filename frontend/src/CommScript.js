import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const CommScript= () => {
  const [activeLink, setActiveLink] = useState(null);
  const location = useLocation(); // 현재 경로 가져오기

  useEffect(() => {
    // 현재 경로의 파일명 가져오기
    const currentPath = location.pathname.split("/").pop();
    
    // 모든 사이드바 링크들 가져오기
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');

    sidebarLinks.forEach(link => {
      const linkPath = link.getAttribute('href').split("/").pop(); // 링크의 파일명만 가져오기

      if (linkPath === currentPath) {
        setActiveLink(linkPath); // 현재 페이지와 경로가 일치하는 링크에 active 상태 저장

        // 서브메뉴가 있는 경우 서브메뉴도 열리도록 설정
        const parentLi = link.closest('li');
        const submenu = parentLi.querySelector('.submenu');
        if (submenu) {
          submenu.style.display = 'block'; // 서브메뉴가 있으면 열림 상태로 설정
        }

        // 현재 페이지가 서브메뉴 중 하나라면 상위 메뉴도 열림 상태로 설정
        const upperMenu = parentLi.closest('ul').previousElementSibling;
        if (upperMenu && upperMenu.classList.contains('toggle-submenu')) {
          upperMenu.classList.add('active-link'); // 상위 메뉴에 active 클래스 추가
          const parentSubmenu = upperMenu.nextElementSibling;
          if (parentSubmenu) {
            parentSubmenu.style.display = 'block'; // 상위 메뉴도 펼쳐짐 상태로 설정
          }
        }
      } else {
        link.classList.remove('active-link'); // 그렇지 않으면 클래스 제거
      }
    });
  }, [location.pathname]); // 경로가 변경될 때마다 실행

  useEffect(() => {
    // 서브메뉴 토글 기능 설정
    const toggleSubmenuLinks = document.querySelectorAll('.toggle-submenu');

    toggleSubmenuLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault(); // 링크 클릭 시 페이지 이동 방지
        const submenu = this.nextElementSibling; // 클릭한 링크의 다음 요소 (서브메뉴) 가져오기

        if (submenu.style.display === 'block') {
          submenu.style.display = 'none'; // 서브메뉴가 보일 때는 숨김
        } else {
          submenu.style.display = 'block'; // 서브메뉴가 숨겨져 있을 때는 보임
        }
      });
    });

    return () => {
      // 이벤트 리스너 정리
      toggleSubmenuLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div>
      {/* 사이드바 */}
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/page1" className={activeLink === 'page1' ? 'active-link' : ''}>Page 1</Link>
          </li>
          <li>
            <Link to="/page2" className={activeLink === 'page2' ? 'active-link' : ''}>Page 2</Link>
            <ul className="submenu" style={{ display: 'none' }}>
              <li>
                <Link to="/page2/subpage1" className={activeLink === 'subpage1' ? 'active-link' : ''}>Subpage 1</Link>
              </li>
              <li>
                <Link to="/page2/subpage2" className={activeLink === 'subpage2' ? 'active-link' : ''}>Subpage 2</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/page3" className={activeLink === 'page3' ? 'active-link' : ''}>Page 3</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CommScript;