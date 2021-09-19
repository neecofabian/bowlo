<script>
	/* export let postData; */
	import { getRelativeDateString, getAbbreviatedNumberString } from '../../utils.ts';
	import { params } from '@sveltech/routify';
	/* console.log(postData); */

  export let message;
  export let sender;
  const ts = new Date(message.when);


</script>

<div class="post">
	<div class="post__votes">
		<svg id="post__votesUpvote"><use xlink:href="/icons.svg#arrow-up-bold" /></svg>
		{message.votes}
		<svg id="post__votesDownvote"><use xlink:href="/icons.svg#arrow-down-bold" /></svg>
	</div>
    <div class="post__body">
        <h3 class="post__title">
            {message.what}
        </h3>
        <div class="post__content">{message.content}</div>
        <div class="post__meta">
            <span class="post__details">{message.who} ●</span>
			<span class="post__timestamp">{ts.toLocaleTimeString()} </span>
        </div>
    </div>
</div>

<style>
    .post {
		background: #f1faee;
		border: 1px solid #ccc;
		margin-bottom: -1px;
		display: flex;
		padding: 0.8rem 0.8rem 0.8rem 4.8rem;
		position: relative;
		z-index: 0;
	}
	.post:first-child {
		border-radius: 4px 4px 0 0;
	}
	.post:hover {
		border-color: #878A8C;
		z-index: 1;
	}
	.post__votes {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #a8dadc;
		color: #1a1a1b;
		font-size: 1.2rem;
		font-weight: 700;
		line-height: 1.6rem;
		padding: 0.8rem 0.4rem;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 4rem;
		box-sizing: border-box;
		z-index: 0;
	}
	#post__votesUpvote,
	#post__votesDownvote {
		width: 2.2rem;
		height: 2.2rem;
		fill: #878A8C;
	}
	#post__votesUpvote:hover {
		fill: #cc3700;
	}
	#post__votesDownvote:hover {
		fill: #5a75cc;
	}
	.post:first-child .post__votes {
		border-radius: 4px 0 0 0;
	}
	.post__preview {
		height: 6rem;
		overflow: hidden;
		border-radius: 4px;
		flex: 0 0 8rem;
		background-color: #1c1c1c08;
		position: relative;
	}
	#post__previewIcon {
		width: 2.4rem;
		height: 2.4rem;
		fill: #878A8C;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate( -50%, -50% );
	}
	.post__body {
		margin-left: 0.8rem;
  color:#6f6f6f;
  font-size:10px;
  width:100%;
  position: relative;
  display: inline-block;
  height: auto;

	}
	.post__title {
		color: #222;
		font-size: 1.6rem;
		font-weight: 500;
		line-height: 2rem;
		margin: 0;
		padding: 0;
		display: inline;
	}
	.post__isOC {
		background: #0079D3;
		color: #fff;
		font-size: 1.2rem;
		line-height: 1.6rem;
		font-weight: 500;
		padding: 1px 4px;
		border-radius: 2px;
		display: inline-block;
	}
	.post__url {
		color: #0079D3;
		font-size: 1.2rem;
		line-height: 1.6rem;
		font-weight: 400;
		display: block;
		position: relative;
		z-index: 2;
		display: inline;
	}
	.post__urlIcon {
		fill: #0079D3;
		width: 1.2rem;
		height: 1.2rem;
		vertical-align: middle;
		margin-top: -.1rem;
	}
	.post__url:hover {
		text-decoration: underline;
	}
	.post__meta {
		font-size: 1.2rem;
		line-height: 1.6rem;
		font-weight: 400;
		color: #787C7E;
	}

	.post__content {
		font-size: 1.2rem;
		line-height: 1.6rem;
		font-weight: 400;
		color: #222;
	}

	.post__subreddit {
		line-height: 2rem;
		font-weight: 700;
		color: #1C1C1C;
		position: relative;
		z-index: 2;
	}
	.post__subreddit:hover {
		text-decoration: underline;
	}
	.post__detailsAuthor {
		color: inherit;
		position: relative;
		z-index: 2;
	}
	.post__detailsAuthor:hover {
		text-decoration: underline;
	}
	.post__timestamp {
		color: inherit;
		position: relative;
		z-index: 2;
	}
	.post__timestamp:hover {
		text-decoration: underline;
	}
	.post__actions {
		color: #878a8c;
		font-size: 1.2rem;
		line-height: 1.2rem;
		font-weight: 700;
		/* margin-top: 4px; */
	}
	.post__action {
		color: inherit;
		fill: inherit;
		padding: 6px 4px;
		border-radius: 2px;
		display: inline-block;
	}
	.post__action:hover {
		background-color: rgba( 26,26,27,0.1 );
	}
	.post__action--comments {
		background-image: url(/icons.svg#comment);
		background-size: 16px 16px;
		background-repeat: no-repeat;
		background-position: 0 0;
	}
</style>
