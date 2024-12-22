import asyncio
import re
import aiomysql
import time  
from datetime import datetime

from crawling1_async import crawl_1_async 
from crawling2_async import crawl_2_async

async def save_to_db(crawl_1_data, crawl_2_data):
    
    crawl_item = []
    pattern = r"^\d{4}-\d{2}-\d{2} ~ \d{4}-\d{2}-\d{2}$"

    # 카테고리/ 타이틀/ 시작일/ 마감일/ 공고올린기관/ 게시일/ 조회수

    # for i in range(len(crawl_1_data)):
    for i in range(10): # 테스트용
        if not crawl_1_data[i]:
            print("예외처리")
            continue
        else:
            if re.match(pattern, crawl_1_data[i][3]):
                start_date_str, end_date_str = crawl_1_data[i][3].split(" ~ ")
                start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
                end_date = datetime.strptime(end_date_str, "%Y-%m-%d")
            else:
                start_date = None
                end_date = None
            temp = crawl_1_data[i][6]
            date_item = datetime.strptime(temp,"%Y-%m-%d")
            crawl_item.append([
                crawl_1_data[i][2],
                start_date,        
                end_date, 
                None,
                crawl_1_data[i][5],
                date_item,
                crawl_1_data[i][1]
                ])

    # for i in range(len(crawl_2_data)):
    for i in range(10): #테스트 용
        if not crawl_2_data[i]:
            print("예외처리")
            continue
        else:
            if re.match(pattern, crawl_2_data[i][2]):
                start_date_str, end_date_str = crawl_2_data[i][2].split(" ~ ")
                start_date = datetime.strptime(start_date_str, "%Y-%m-%d")
                end_date = datetime.strptime(end_date_str, "%Y-%m-%d")
            else:
                start_date = None
                end_date = None
            temp = crawl_2_data[i][6]
            date_item = datetime.strptime(temp,"%Y.%m.%d")
            crawl_item.append([
                crawl_2_data[i][1],
                start_date,
                end_date,
                crawl_2_data[i][3],
                crawl_2_data[i][5],
                date_item,
                "기타"
                ])
            
    for h in range(len(crawl_item)):
        print(crawl_item[h])

    # db삽입
    try:
        conn = await aiomysql.connect(
            host='localhost',
            port=3306,
            user='root',
            password='1755',
            db='business_list',
        )
        for q in range(len(crawl_item)):
            async with conn.cursor() as cursor:
                query = """
                INSERT INTO project_info (title, start_date, end_date, notice_number, department, reg_date, category )
                VALUES (%s, %s,%s,%s,%s,%s,%s);
                """
                await cursor.execute(query, (crawl_item[q][0],crawl_item[q][1],crawl_item[q][2],crawl_item[q][3],crawl_item[q][4],crawl_item[q][5],crawl_item[q][6]))
                await conn.commit()
        
        
    except Exception as e:
        print(f"Database error: {e}")
    finally:
        if conn:
            await conn.ensure_closed()

# 사업공고 DB가져오기
async def select_DB():
    try:
        conn = await aiomysql.connect(
            host='localhost',
            port=3306,
            user='root',
            password='1755',
            db='business_list',
        )
        async with conn.cursor() as cursor:
            query = """
            SELECT * FROM project_info
            """
            await cursor.execute(query)
            result = await cursor.fetchall()
            DB_list = list(result)
            print(type(DB_list))
            return DB_list
            
    except Exception as e:
        print(f"Database error: {e}")
    finally:
        if conn:
            await conn.ensure_closed()

async def main():
    start_time = time.time()

    DB_data = await select_DB() # DB데이터 list 타입
    
    try:
        # 비동기 크롤링 작업 실행
        crawl_1_data, crawl_2_data = await asyncio.gather(
            crawl_1_async(),
            crawl_2_async()
        )
        # 데이터베이스에 JSON 데이터 저장
        await save_to_db(crawl_1_data, crawl_2_data)
    except Exception as e:
        print(f"Error in main execution: {e}")

    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f"처리 완료 시간: {elapsed_time:.4f} 초")

    # return crawl_1_data, crawl_2_data

if __name__ == '__main__':
    asyncio.run(main())