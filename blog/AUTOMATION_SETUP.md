# Blog Automation Setup with n8n

This guide explains how to set up automated blog posting with social media cross-posting using **n8n** (free, self-hosted) or **n8n Cloud** (free tier available).

## Overview

```
Document Upload (Google Drive/Email/Dropbox)
        ↓
  n8n Workflow Trigger
        ↓
  Claude/OpenAI API (transforms content)
        ↓
  ┌─────────────────────────────────────────────────┐
  │                                                 │
  ↓                     ↓                          ↓
GitHub              Buffer/Direct               Email
(commit post)       (schedule social)      (notify you)
```

---

## Step 1: Install n8n (Free, Self-Hosted)

### Option A: Docker (Recommended)
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### Option B: npm
```bash
npm install n8n -g
n8n start
```

### Option C: n8n Cloud
Sign up at https://n8n.io (free tier: 5 workflows, 500 executions/month)

---

## Step 2: Create the Workflow

### Trigger: Google Drive Watch

1. Add **Google Drive Trigger** node
2. Set to watch a specific folder (e.g., `/Blog Drafts`)
3. Trigger on: "File Created"

### Node 2: Get File Content

1. Add **Google Drive** node (Download action)
2. Get the file content from the trigger

### Node 3: AI Transform (Claude or OpenAI)

1. Add **HTTP Request** node for Claude API:

```json
{
  "method": "POST",
  "url": "https://api.anthropic.com/v1/messages",
  "headers": {
    "x-api-key": "YOUR_CLAUDE_API_KEY",
    "anthropic-version": "2023-06-01",
    "content-type": "application/json"
  },
  "body": {
    "model": "claude-sonnet-4-20250514",
    "max_tokens": 4096,
    "messages": [{
      "role": "user",
      "content": "Transform this document into a blog post with the following structure:\n\n1. Create a compelling title\n2. Write a meta description (160 chars max)\n3. Format the content in HTML with proper h2/h3 headings\n4. Add a category (business, tech, fitness, or habits)\n5. Create 3 social media posts:\n   - Twitter/X (280 chars)\n   - LinkedIn (longer, professional)\n   - Instagram caption\n\nDocument:\n{{$node['Get File Content'].json.content}}\n\nRespond in JSON format:\n{\n  \"title\": \"\",\n  \"slug\": \"\",\n  \"description\": \"\",\n  \"category\": \"\",\n  \"content_html\": \"\",\n  \"social\": {\n    \"twitter\": \"\",\n    \"linkedin\": \"\",\n    \"instagram\": \"\"\n  }\n}"
    }]
  }
}
```

### Node 4: Parse AI Response

1. Add **Code** node to parse the JSON response
2. Extract title, content, social posts

### Node 5: Generate HTML File

1. Add **Code** node to generate the blog post HTML using your template
2. Use the template structure from `/blog/posts/ai-automation-for-small-business.html`

### Node 6: Commit to GitHub

1. Add **GitHub** node
2. Action: Create File
3. Repository: `thesecretchief/professionalprofile`
4. File Path: `blog/posts/{{$json.slug}}.html`
5. Content: Generated HTML
6. Commit Message: `Add blog post: {{$json.title}}`

### Node 7: Post to Social Media

#### Option A: Buffer (Recommended)
1. Add **HTTP Request** node
2. POST to `https://api.bufferapp.com/1/updates/create.json`
3. Schedule posts for optimal times

#### Option B: Direct to X/Twitter
1. Add **Twitter** node (requires API access)
2. Post the Twitter snippet

#### Option C: Direct to LinkedIn
1. Add **LinkedIn** node
2. Post the LinkedIn snippet

### Node 8: Email Notification

1. Add **Email Send** node
2. Send yourself a summary with links

---

## Step 3: Workflow JSON Import

Save this as `blog-automation-workflow.json` and import into n8n:

```json
{
  "name": "Blog Post Automation",
  "nodes": [
    {
      "name": "Google Drive Trigger",
      "type": "n8n-nodes-base.googleDriveTrigger",
      "position": [250, 300],
      "parameters": {
        "folderId": "YOUR_FOLDER_ID",
        "event": "fileCreated"
      }
    },
    {
      "name": "Download Document",
      "type": "n8n-nodes-base.googleDrive",
      "position": [450, 300],
      "parameters": {
        "operation": "download",
        "fileId": "={{$node['Google Drive Trigger'].json.id}}"
      }
    },
    {
      "name": "AI Transform",
      "type": "n8n-nodes-base.httpRequest",
      "position": [650, 300],
      "parameters": {
        "method": "POST",
        "url": "https://api.anthropic.com/v1/messages",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpHeaderAuth",
        "sendBody": true,
        "bodyParameters": {
          "parameters": []
        },
        "options": {}
      }
    }
  ],
  "connections": {
    "Google Drive Trigger": {
      "main": [[{"node": "Download Document", "type": "main", "index": 0}]]
    },
    "Download Document": {
      "main": [[{"node": "AI Transform", "type": "main", "index": 0}]]
    }
  }
}
```

---

## Step 4: Required API Keys

### Claude API (Anthropic)
1. Sign up at https://console.anthropic.com
2. Create an API key
3. Add to n8n credentials

### GitHub Personal Access Token
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Create token with `repo` scope
3. Add to n8n GitHub credentials

### Buffer (for social scheduling)
1. Sign up at https://buffer.com (free tier: 3 channels)
2. Get API access token
3. Add to n8n credentials

### Alternative: X/Twitter API
1. Apply for developer access at https://developer.twitter.com
2. Create an app and get API keys
3. Add to n8n Twitter credentials

---

## Step 5: Update Blog Index

After each new post, you'll need to update `/blog/index.html` to include the new post card. You can automate this too:

1. Add another **GitHub** node after the post creation
2. Fetch current `blog/index.html`
3. Use **Code** node to insert new post card HTML
4. Commit the updated file

---

## Workflow Variations

### Email-Based Trigger
Replace Google Drive trigger with **Email Trigger (IMAP)**:
- Watch a specific email address
- Process attachments or email body as content

### Notion Trigger
Use **Notion** node to watch a database:
- Create a "Blog Drafts" database
- Trigger when status changes to "Ready to Publish"

### Manual Trigger with Form
Add **Webhook** node:
- Create a simple form to submit blog content
- Trigger workflow on form submission

---

## Social Media Posting Schedule

For optimal engagement, schedule posts at different times:

| Platform | Best Time | Post Content |
|----------|-----------|--------------|
| X/Twitter | 9am, 12pm, 5pm | Short teaser + link |
| LinkedIn | 8am, 12pm | Longer insight + link |
| Instagram | 11am, 7pm | Visual caption + story link |

Buffer handles this scheduling automatically with their "Optimal Timing" feature.

---

## Cost Breakdown (Monthly)

| Service | Cost |
|---------|------|
| n8n (self-hosted) | Free |
| Claude API | ~$5-15 (depends on usage) |
| Buffer Free | Free (3 channels, 10 posts/channel) |
| GitHub | Free |
| **Total** | **~$5-15/month** |

---

## Troubleshooting

### AI Output Not Parsing Correctly
- Ensure you're asking for JSON format explicitly
- Add a JSON parsing step with error handling
- Log raw output to debug

### GitHub Commit Failing
- Check file path doesn't have special characters
- Ensure token has correct permissions
- Check branch protection rules

### Social Posts Not Publishing
- Verify API credentials are valid
- Check rate limits on free tiers
- Review Buffer/Twitter error responses

---

## Next Steps

1. Set up n8n (Docker recommended)
2. Create credentials for Claude, GitHub, and Buffer
3. Import and customize the workflow
4. Test with a sample document
5. Set up error notifications

For questions or help setting this up, reach out at [your contact info].
