// Use arrow functions to handle stdout and stderr
export const processStream = (
  stream: ReadableStream,
  output: NodeJS.WriteStream
) => {
  const reader = stream.getReader();
  const processChunk = async () => {
    const { done, value } = await reader.read();
    if (done) {
      console.log(
        `${output === process.stdout ? 'stdout' : 'stderr'} complete`
      );
      return;
    }
    output.write(value);
    await processChunk();
  };
  processChunk();
};
