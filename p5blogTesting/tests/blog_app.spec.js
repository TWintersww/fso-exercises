const {test, expect, describe, beforeEach} = require('@playwright/test')
const {loginWith, createBlog} = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({page, request}) => {
        await request.post('http://localhost:5173/api/tests/clear')
        await request.post('http://localhost:5173/api/users', {
            data: {
                username: "evwu",
                name: "Evan Wu",
                password: "evwu"
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({page}) => {
        await expect(page.getByText('log in to application')).toBeVisible()
    })

    describe('Login', () => {
        test('Successful login', async ({page}) => {
            await loginWith(page, 'evwu', 'evwu')
    
            await expect(page.getByText('evwu is logged in')).toBeVisible()
        })

        test('Unsuccessful login', async ({page}) => {
            await loginWith(page, 'evwu', 'wrong')

            const errorDiv = await page.locator('.error')
            await expect(errorDiv).toContainText('wrong username or password')
            await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({page}) => {
            await loginWith(page, 'evwu', 'evwu')
        })

        test('A new blog can be created', async ({page}) => {
            await createBlog(page, 'testTitle', 'testAuthor', 'testUrl')

            await expect(page.getByText('testTitle testAuthor')).toBeVisible()
        })

        describe('With one blog', () => {
            beforeEach(async ({page}) => {
                await createBlog(page, 'testTitle', 'testAuthor', 'testUrl')
            })

            test('Like the blog', async ({page}) => {
                await page.pause()

                await page.getByTestId('viewbutton').click()
                await page.getByTestId('likebutton').click()

                await expect(page.getByText('likes 1')).toBeVisible()
            })

            test('User can delete the blog', async ({page}) => {
                // await page.pause()
                
                //event handler for dialog
                page.on('dialog', dialog => dialog.accept())

                await page.getByTestId('viewbutton').click()
                await page.getByTestId('deletebutton').click()

                await page.waitForSelector('.partialBlog', {state: 'hidden'})
                await page.waitForSelector('.fullBlog', {state: 'hidden'})
                await expect(page.getByText('testTitle testAuthor')).not.toBeVisible()
                await expect(page.getByText('Evan Wu')).not.toBeVisible()
            })

            test('Delete button hidden for another user', async ({page, request}) => {
                await request.post('http://localhost:5173/api/users', {
                    data: {
                        username: "user2",
                        name: "User2",
                        password: "user2"
                    }
                })

                //log out of evwu and into user2
                await page.getByTestId('logoutbutton').click()
                await loginWith(page, 'user2', 'user2')

                await page.waitForSelector('.partialBlog')
                await page.getByTestId('viewbutton').click()

                await expect(page.getByTestId('deletebutton')).not.toBeVisible()
            })
        })

    })

    describe('Bypassing user input for 3 Backend entries', () => {
        let token;

        beforeEach(async ({page, request}) => {
            const loginResponse = await request.post('http://localhost:5173/api/login', {
                data: {
                    username: 'evwu',
                    password: 'evwu'
                }
            })
            const loginData = await loginResponse.json()
            token = loginData.token

            await page.evaluate((token) => {
                localStorage.setItem('userInSession', JSON.stringify({token, username: 'evwu', name: 'Evan Wu'}))
            })
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }

            await request.post('http://localhost:5173/api/blogs', {
                data: {
                    title: 'blog1',
                    author: 'author1',
                    url: 'url1',
                    likes: 5
                },
                headers
            })
            await request.post('http://localhost:5173/api/blogs', {
                data: {
                    title: 'blog2',
                    author: 'author2',
                    url: 'url2',
                    likes: 10
                },
                headers
            })
            await request.post('http://localhost:5173/api/blogs', {
                data: {
                    title: 'blog3',
                    author: 'author3',
                    url: 'url3',
                    likes: 15
                },
                headers
            })

            await page.reload()
        })

        test('All 3 blogs show', async ({page}) => {
            await expect(page.getByText('blog1 author1')).toBeVisible()
            await expect(page.getByText('blog2 author2')).toBeVisible()
            await expect(page.getByText('blog3 author3')).toBeVisible()
        })

        test('Blogs ordered by likes, descending', async ({page}) => {
            await page.getByText('blog3 author3').waitFor()

            const topBlog = page.getByText('blog3 author3');
            const midBlog = page.getByText('blog2 author2');
            const botBlog = page.getByText('blog1 author1');

            await topBlog.getByTestId('viewbutton').click()
            await midBlog.getByTestId('viewbutton').click()
            await botBlog.getByTestId('viewbutton').click()

            await expect(topBlog.locator('..')).toContainText('likes 15')
            await expect(midBlog.locator('..')).toContainText('likes 10')
            await expect(botBlog.locator('..')).toContainText('likes 5')
        })



    })

})
