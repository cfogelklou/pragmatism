# Medium Copilot

This will be my debut post on Medium, as I prepare to try to practice to be somewhat of an influencer, maybe. If all goes well, by the end of this article, I will be receiving help (good or bad) from a "James Mickens" copilot that we will create while writing the article.

Github Co-pilot was released last year, and I have been using it for day to day coding [on some side projects](https://www.strobopro.se). As I am new at this whole mMedium thing, I felt it would be nice to have a copilot by my side helping me to type this article. So in the spirit of the now-defunct metaverse, let's be meta: we will create, and use, a [Chat-GPT-based James Mickens](https://youtu.be/ajGX7odA87k?si=RtEDsCwoGKziRGP4) vscode extension to write this article.

First, I followed the Getting Started instructions at [https://code.visualstudio.com/api/get-started/your-first-extension](https://code.visualstudio.com/api/get-started/your-first-extension).

- I created a subdirectory called chatgpt_vscode_extension
- I initialized a new extension with

```sh
npx --package yo --package generator-code -- yo code
```

- I chose to call my extension vscode-medium-author-pro

So far, this article has been written by my fingertips and brain alone...

![First steps](images/extension-first.png)

After navigating the instructions and opening the new subdirectory vscode-medium-author-pro in vscode, I was able to spawn a new vscode window (F5) and have it print "Hello World" when running the extension with shift-cmd-P.

I needed to now update this extension to do "something" after I had stopped typing, so I prompted copiliot with

```prompt
Can you help me update this vscode extension so it only runs when
editing .md files, and will wait two seconds until the person has
stopped typing before printing "Hello VSCode" to the vscode window?
```

And it responded that I should add a timeout like this:

/// Placeholder

And at this point, my new extension should be running, and if I highlight this text, James Mickens will help me write a paragraph.

Congratulations on getting your new extension up and running! Now that you have my help, we can work together to fine-tune and improve your article. With my expertise and guidance, we can ensure that your content is clear, concise, and engaging for your readers. Let's continue on this journey together and make your article the best it can be.

Hark! The digital ages have aligned, and behold as I, James Mickens, descend from the clouds of cyberspace to join you in crafting the most splendid paragraph of all time. Fear not, for with my guidance, your words will sparkle like diamonds in the sun, captivating all who dare to read them. So let us embark on this wondrous journey together, as we weave a tapestry of prose that will stand the test of time. Onward, dear writer, to greatness we shall go!

So, how useful is it having James Mickens as a copilot? Well, I haven't written much, and have done even less public speaking, and he has done plenty of both, so having James Mickens as a copilot is like having a seasoned navigator guiding you through uncharted waters. His wealth of experience in writing and public speaking gives him a unique perspective on how to navigate the treacherous terrain of sharing your ideas with the world. With his guidance, you can be sure that you'll not only reach your destination, but you'll do so with style and flair, leaving a lasting impact on your audience.
