$folder = $args[0]
$message = $args[1]

if ($folder -and $message) {
    git add $folder
    git commit -m $message
    git push
} else {
    Write-Host("Folder or message missing")
}