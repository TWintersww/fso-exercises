import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('try creating new blog', async () => {
    const newBlogHandler = vi.fn()
    render(<BlogForm createBlog={newBlogHandler}/>)

    const titleInput = screen.getByPlaceholderText('write title here')
    const authorInput = screen.getByPlaceholderText('write author here')
    const urlInput = screen.getByPlaceholderText('write url here')
    const submitButton = screen.getByText('create')

    const user = userEvent.setup()
    await user.type(titleInput, 'testTitle')
    await user.type(authorInput, 'testAuthor')
    await user.type(urlInput, 'testUrl')
    await user.click(submitButton)

    // console.log(newBlogHandler.mock.calls)
    expect(newBlogHandler.mock.calls).toHaveLength(1)
    expect(newBlogHandler.mock.calls[0][0].title).toBe('testTitle')
    expect(newBlogHandler.mock.calls[0][0].author).toBe('testAuthor')
    expect(newBlogHandler.mock.calls[0][0].url).toBe('testUrl')
})
