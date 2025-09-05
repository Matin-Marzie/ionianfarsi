
const Media = ({challenge}) => {
    const current_challenge_media_type = challenge?.media_type;

    return (
        <div>
            {/* If there is no media, we don't display <Media /> compoentn */}
            {current_challenge_media_type ? (
                <div>Media-{current_challenge_media_type}</div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default Media
