```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: JSON data [{ "content": "content of the note", "date": "xxxx-xx-xx" }]
    deactivate server

    Note right of browser: No redirect here, the browser stays on the same page thanks to the e.preventDefault() method
